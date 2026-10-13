# AI 编译器与 GPU 存储层级知识库

> 调研日期：2026-10-13
> 调研方式：Sub-agent 核实官方文档
> 用途：AI 编译器岗面试题答案的事实依据

---

## 一、GPU 存储层级（Hopper H100 / 数据中心 Blackwell）

出处：CUDA C++ Programming Guide、Hopper Tuning Guide、Blackwell Tuning Guide、PTX ISA、H100 架构白皮书。

| 层级 | H100 | 备注 |
|---|---|---|
| 寄存器文件 | 每 SM 64K 个 32 位寄存器（换算 256KB），每线程上限 255 个 | 官方只给个数，正文写“64K 个 32 位寄存器”更稳 |
| L1 + shared + texture 合并 | 每 SM 256KB（A100 192KB） | Blackwell sm_100 相同；sm_120 是 128KB |
| shared memory | 每 SM 最多 228KB，单 block 最多 227KB，CUDA 预留 1KB，静态 shared 仍限 48KB | carveout 档位 0/8/16/32/64/100/132/164/196/228KB |
| constant memory | 总量 64KB，每 SM constant cache working set 8KB | 所有计算能力都一样，至今未变 |
| texture cache | 已并入统一数据缓存，不再是独立结构 | 官方表给区间不给定值 |
| L2 | H100 50MB（A100 40MB） | Blackwell 官方原句主语是 **GB200 的 126MB**，不要写成 B200 |
| HBM | H100 SXM 80GB HBM3；架构文档“up to 3TB/s”，产品数据手册 3.35TB/s | 两个口径，引用时说明 |
| B200 HBM | 官方口径 **180GB** HBM3e，带宽“最高 8TB/s” | 192GB 是物理堆栈容量，只在第三方页面出现 |
| SM 数量 | H100 SXM5 132 个（完整 GH100 die 144 个，PCIe 版 114 个） | 白皮书 v1.01 |

Hopper 新增：

- TMA（Tensor Memory Accelerator）：异步拷贝引擎，在 global 与 shared 之间搬 1D 到 5D 张量，也能在同一 cluster 内不同 SM 的 shared memory 之间搬；写回 global 时可做按元素归约
- Thread Block Cluster（计算能力 9.0）：cluster 内的 block 保证被调度到同一个 GPC，可移植最大规模 8，设置 `cudaFuncAttributeNonPortableClusterSizeAllowed` 后可用 16
- Distributed Shared Memory：cluster 内各 block 可互相读写、原子操作对方的 shared memory，总量 = cluster 内 block 数 × 每 block shared 大小；官方建议访问合并并按 32 字节对齐

Blackwell 新增 Tensor Memory（TMEM）：

- PTX ISA 原文：sm_100a/sm_100f 上第五代 Tensor Core 的 Tensor Memory 为 **每 CTA** 512 列 × 128 行、每格 32 位，换算 256KB
- 分配以列为单位，最小 32 列、列数为 2 的幂，由单个 warp 调 `tcgen05.alloc` 并由同一 warp 释放；每个 warp 只能访问属于自己的 32 个 lane
- 配套指令 `tcgen05.mma`，Hopper 的 `wgmma.mma_async` 在 Blackwell 上已弃用
- 只有数据中心 Blackwell（sm_100）有，消费级 sm_120 没有
- 官方没有正面给出“256KB”这个数字，只能由 512×128×32bit 换算

---

## 二、CPU 与 GPU 架构对比（CUDA C++ Programming Guide 原文口径）

- 晶体管分配：GPU 把更多晶体管用于数据处理，而不是数据缓存和流程控制，靠计算掩盖访存延迟，而不是靠大缓存和复杂控制流规避长延迟（Figure 1 “The GPU Devotes More Transistors to Data Processing”）
- CPU 面向单线程最快，能并行几十个线程；GPU 同时跑几千个线程，用牺牲单线程性能换总吞吐
- SIMT：SM 以 32 个线程为一组创建、管理、调度和执行线程，这一组叫 warp；官方明确写了 GPU 指令按顺序发射，没有分支预测和推测执行；Volta 起引入 Independent Thread Scheduling
- 吞吐换算：warp size 32，每周期 N 个操作等于 N/32 条指令每周期
- 注意：CPU 侧的乱序执行属于常识表述，CUDA 文档并没有正面描述，不要当成引文

---

## 三、LLVM 与 MLIR

- MLIR 核心是 dialect，多层 IR 共存、渐进式 lowering（progressive lowering），上层、下层和自定义 dialect 可以混在同一个 module 里
- 官方 dialect 列表确认存在：linalg、tensor、memref、affine、scf、arith、gpu、nvvm、llvm，另有 vector、bufferization、func、cf、math、index、sparse_tensor、amdgpu、nvgpu、rocdl、spirv、tosa、transform、xegpu
- 时间线：2018 年初在 Google 启动，2019 年 4 月先放进 TensorFlow 仓库，2019 年 9 月 9 日 Chris Lattner 在 llvm-dev 提案，2019 年 10 月 7 日 LLVM 基金会接受，2019 年 12 月底代码合入 LLVM monorepo。正文写“2019 年底正式成为 LLVM 子项目”
- Triton 编译流程（NVIDIA 后端）：Python 源码 → TTIR（Triton IR，block 级、机器无关）→ TTGIR（TritonGPU IR，带 layout、访存模式、warp 级数据分布）→ LLVM IR → PTX → cubin。TTIR→TTGIR 之间跑 MLIR pass，如 plan_cta、remove_layout_conversions、accelerate_matmul、optimize_dot_operands；PTX→cubin 由 ptxas 完成。各后端在 `compiler.py` 的 `add_stages` 注册 make_ttir / make_ttgir / make_llir / make_ptx / make_cubin。AMD 后端前三段相同，之后是 amdgcn 和 hsaco
- 出处：PyTorch 官方博客 Triton Kernel Compilation Stages，以及 Triton 源码 `third_party/<vendor>/backend/compiler.py`。Triton 官方文档站没有一页把四级 IR 列全

---

## 四、AI/GPU DSL 生态（2025-2026）

| 名称 | 所属 | 定位 | 时间 |
|---|---|---|---|
| Triton | triton-lang/triton（openai/triton 已重定向），Philippe Tillet 在 OpenAI 主导 | Python 嵌入式 tile 级 kernel DSL，编译器内部用 MLIR | MAPL 2019 论文 |
| TileLang | tile-ai 组织，作者来自北京大学、微软亚洲研究院、帝国理工 | 把调度空间（thread binding、layout、tensorize、pipeline）与 dataflow 解耦 | 仓库 2024-10，论文 arXiv:2504.17577 |
| CUTLASS CuTe DSL | NVIDIA | CUTLASS 4.0 起的 Python DSL，与 CuTe C++ 的 layout/tensor/atom 抽象同构，pip 包 nvidia-cutlass-dsl，仍标 public beta | 2025 年 5 月随 4.0 发布 |
| cuTile / CUDA Tile | NVIDIA | CUDA 13.1 引入的 tile 编程模型，三层：CUDA Tile IR（新虚拟指令集）、cuTile Python、tileiras（Tile IR 字节码编译成 SASS） | 随 CUDA 13.1 于 2025-12-04 公开，首发针对 Blackwell |
| ThunderKittens | Stanford Hazy Research | C++ 嵌入式 tile 原语库，warp 级 16×16 矩阵 tile 为基本数据结构，block 级用 Load-Compute-Store-Finish 模板 | 2024-03，论文 arXiv:2410.20399 |
| JAX Pallas | Google / JAX | JAX 的 kernel 编写扩展，一套 API 覆盖 GPU 与 TPU。**GPU 后端已是 Mosaic GPU，不是 Triton**，Triton 后端只做 best-effort 维护；Mosaic GPU 只支持 Hopper 及更新 | 官方 Quickstart 现行表述 |
| PyTorch Helion | PyTorch 基金会仓库，Meta 开发 | Python 嵌入式高层 DSL，编译成自动调优后的 Triton 代码，核心机制是自动调优引擎 | 2025-04 建仓，2025-10-22 发 Beta |
| Mojo | Modular | 独立语言，完全建立在 MLIR 之上，支持 AOT 与 JIT，2025 年 6 月起标准库内置可移植 GPU 编程；不是 Python 源码兼容 | 2023-04 |
| Apache TVM | ASF | 深度学习编译框架；TVM Unity 把 FFI、TensorIR、Meta-Schedule、Relax 统一进一个 IRModule，同时容纳图层 IR（Relax）和张量层 IR（TensorIR） | TensorIR ASPLOS 2023，Relax ASPLOS 2025 |
| Halide | 起源 MIT CSAIL | C++ 嵌入式语言，核心思想是算法与 schedule（顺序、局部性、存储）解耦 | PLDI 2013 |

---

## 五、字节跳动相关开源

- **ByteIR**：官方自述“ByteIR Compiler is an MLIR-based compiler for CPU/GPU/ASIC”，复用上游 MLIR dialect 和 Google Mhlo，pass 与上游兼容可混用，前端把模型 lower 到 StableHLO。Apache 2.0，仓库 2023-02 建立。https://github.com/bytedance/byteir
- **Triton-distributed**（ByteDance Seed）：基于 Triton 的分布式编译器，面向计算通信重叠，编程模型 MPMD，两个关键机制是 symmetric memory（各 rank 分配同样大小的全局作用域缓冲区）和 signal exchange（信号对象放在 symmetric memory 里做同步）。论文报告 MoE 场景部分算子加速超过 40 倍。主分支已跟踪 Triton 3.7 并改成 out-of-tree plugin，旧 3.4 线在 triton-v3.4 分支。仓库 2025-04，论文 arXiv:2504.19442
- **Flux**（ByteDance Seed）：通信计算重叠 kernel 库，面向 dense 与 MoE 的张量并行、专家并行。把通信和计算切成细 tile 融进一个大 kernel，ReduceScatter 融进 GEMM 的 epilogue，AllGather 融进 prologue。论文数字：128 卡训练相比 Megatron-LM 最高 1.24 倍，推理 prefill、decoding 相比 vLLM 最高 1.66 倍和 1.30 倍。依赖 NCCL、CUTLASS、NVSHMEM。仓库 2024-03，论文 arXiv:2406.06858
- **FlashInfer 与字节无关**：作者单位是华盛顿大学、NVIDIA、Perplexity AI、CMU 和独立研究者，一作 Zihao Ye，仓库在独立组织 flashinfer-ai 下。arXiv:2501.01005，MLSys 2025
- 其他：TileLink（tile 中心原语生成计算通信重叠 kernel，MLSys 2025，arXiv:2503.20313）、COMET（MoE 细粒度计算通信重叠，arXiv:2502.19811，2025-03 开源）、ByteTransformer、LightSeq、MatxScript、ABQ-LLM；ByteDance-Seed 组织下另有 ShadowKV、FlexPrefill、cudaLLM

---

## 六、国产 GPU / NPU 编程生态

- **华为昇腾**：CANN 软件栈提供 Ascend C，在 C/C++ 上裁剪扩展的自定义算子开发语言。入口 https://www.hiascend.com/cn/developer/operator （华为文档中心链接结构变动频繁，引用前先确认）
- **Triton-Ascend**：仓库已迁到 https://github.com/triton-lang/triton-ascend （原 Ascend/triton-ascend 即将归档），把 Triton 编译栈适配到昇腾 NPU。2025-05-20 开源，2025-06-30 支持 85% Triton Python API，2026-01-20 发 3.2.0 正式版，2026-04-30 发 3.2.1，2026 年计划升到 Triton 3.5。依赖 CANN Community Edition 9.0.0。Triton-distributed 的 README 提到 triton-ascend 尚未 rebase 到 Triton 3.7，昇腾构建要走 triton-v3.4 分支
- **寒武纪**：BANG 是 MLU 的编程模型代称，BANG C 是在 C/C++ 上裁剪扩展的实例化语言，适配指令集 MLISA；host 侧走 CNRT 或 CNDrv，device 侧由多个 Kernel 构成；工具链 CNCC（BANG 编译成 MLISA）、CNAS（MLISA 编译成目标文件）、CNLINKER。另有基于 Python 的 BANGPy。官方算子仓库 https://github.com/Cambricon/mlu-ops

---

## 七、写作时容易写错的点

1. B200 显存写 180GB（官方口径），192GB 只能作为物理堆栈容量并注明；带宽写“最高 8TB/s”
2. Blackwell 的 L2 官方句子主语是 GB200 的 126MB，不要写成 B200 的 L2
3. TMEM 官方措辞是 per CTA，不是 per SM，且只有 sm_100 有
4. JAX Pallas 的 GPU 后端已是 Mosaic GPU，网上旧资料全写成 Triton
5. H100 的 HBM 带宽，架构文档“up to 3TB/s”，产品数据手册 3.35TB/s
6. MLIR 进入 LLVM 有 2019 年 10 月（基金会接受）和 2019 年 12 月（代码合入）两个日期
7. Triton 仓库现在是 triton-lang/triton
