import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c as t,a as e,d as i,b as l,e as a}from"./app-72970f25.js";const v={},c=a('<p>大家好，我是二哥呀~</p><p>文件上传是一个老生常谈的话题了，在文件相对比较小的情况下，可以直接把文件转化为字节流上传到服务器，但在文件比较大的情况下，用这种方式进行上传，可不是一个好的办法，毕竟很少有用户能忍受，尤其是当文件上传到一半中断后，继续上传却只能重头开始上传，让用户的体验尤其不爽。</p><p>那有没有比较好的上传体验呢，答案有的，就是下边要介绍的几种上传方式。</p><h2 id="秒传" tabindex="-1"><a class="header-anchor" href="#秒传" aria-hidden="true">#</a> 秒传</h2><h3 id="_1、什么是秒传" tabindex="-1"><a class="header-anchor" href="#_1、什么是秒传" aria-hidden="true">#</a> 1、什么是秒传</h3><p>通俗的说，你把要上传的东西上传，服务器会先做 MD5 校验，如果服务器上有同样的东西，它就直接给你个新地址，其实你下载的都是服务器上的同一个文件，想要不秒传，其实只要让 MD5 改变，就是对文件本身做一下修改（改名字不行），例如一个文本文件，你多加几个字，MD5 就变了，就不会秒传了.</p><h3 id="_2、本文实现的秒传核心逻辑" tabindex="-1"><a class="header-anchor" href="#_2、本文实现的秒传核心逻辑" aria-hidden="true">#</a> 2、本文实现的秒传核心逻辑</h3><p>a、利用 redis 的 set 方法存放文件上传状态，其中 key 为文件上传的 md5，value 为是否上传完成的标志位；</p><p>b、当标志位为 true 表示上传已经完成，此时如果有相同文件上传，则进入秒传逻辑。如果标志位为 false，则说明还没上传完成，此时需要再调用 set 方法，保存块号文件记录的路径，其中 key 为上传文件的 md5 + 一个固定前缀，value 为块号文件的记录路径</p><h2 id="分片上传" tabindex="-1"><a class="header-anchor" href="#分片上传" aria-hidden="true">#</a> 分片上传</h2><h3 id="_1、什么是分片上传" tabindex="-1"><a class="header-anchor" href="#_1、什么是分片上传" aria-hidden="true">#</a> 1、什么是分片上传</h3><p>分片上传，就是将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（我们称之为 Part）来进行上传，上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件。</p><h3 id="_2、分片上传的场景" tabindex="-1"><a class="header-anchor" href="#_2、分片上传的场景" aria-hidden="true">#</a> 2、分片上传的场景</h3><p>1.大文件上传</p><p>2.网络环境环境不好，存在需要重传风险的场景</p><h2 id="断点续传" tabindex="-1"><a class="header-anchor" href="#断点续传" aria-hidden="true">#</a> 断点续传</h2><h3 id="_1、什么是断点续传" tabindex="-1"><a class="header-anchor" href="#_1、什么是断点续传" aria-hidden="true">#</a> 1、什么是断点续传</h3><p>断点续传是在下载或上传时，将下载或上传任务（一个文件或一个压缩包）人为的划分为几个部分，每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传或者下载未完成的部分，而没有必要从头开始上传或者下载。</p><p>PS：本文的断点续传主要是针对断点上传场景。</p><h3 id="_2、应用场景" tabindex="-1"><a class="header-anchor" href="#_2、应用场景" aria-hidden="true">#</a> 2、应用场景</h3><p>断点续传可以看成是分片上传的一个衍生，因此可以使用分片上传的场景，都可以使用断点续传。</p><h3 id="_3、实现断点续传的核心逻辑" tabindex="-1"><a class="header-anchor" href="#_3、实现断点续传的核心逻辑" aria-hidden="true">#</a> 3、实现断点续传的核心逻辑</h3><p>在分片上传的过程中，如果因为系统崩溃或者网络中断等异常因素导致上传中断，这时候客户端需要记录上传的进度。在之后支持再次上传时，可以继续从上次上传中断的地方进行继续上传。</p><p>为了避免客户端在上传之后的进度数据被删除而导致重新开始从头上传的问题，服务端也可以提供相应的接口便于客户端对已经上传的分片数据进行查询，从而使客户端知道已经上传的分片数据，从而从下一个分片数据开始继续上传。</p><h3 id="_4、实现流程步骤" tabindex="-1"><a class="header-anchor" href="#_4、实现流程步骤" aria-hidden="true">#</a> 4、实现流程步骤</h3><p>a、方案一，常规步骤</p><ul><li>将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；</li><li>初始化一个分片上传任务，返回本次分片上传唯一标识；</li><li>按照一定的策略（串行或并行）发送各个分片数据块；</li><li>发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件。</li></ul><p>b、方案二、本文实现的步骤</p><ul><li>前端（客户端）需要根据固定大小对文件进行分片，请求后端（服务端）时要带上分片序号和大小</li><li>服务端创建 conf 文件用来记录分块位置，conf 文件长度为总分片数，每上传一个分块即向 conf 文件中写入一个 127，那么没上传的位置就是默认的 0,已上传的就是 Byte.MAX_VALUE 127（这步是实现断点续传和秒传的核心步骤）</li><li>服务器按照请求数据中给的分片序号和每片分块大小（分片大小是固定且一样的）算出开始位置，与读取到的文件片段数据，写入文件。</li></ul><h4 id="_5、分片上传-断点上传代码实现" tabindex="-1"><a class="header-anchor" href="#_5、分片上传-断点上传代码实现" aria-hidden="true">#</a> 5、分片上传/断点上传代码实现</h4><p>a、前端采用百度提供的 webuploader 插件，进行分片。因本文主要介绍服务端代码实现，webuploader 如何进行分片，具体实现可以查看如下链接:</p>',31),u={href:"http://fex.baidu.com/webuploader/getting-started.html",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"b、后端用两种方式实现文件写入，一种是用 RandomAccessFile，如果对 RandomAccessFile 不熟悉的朋友，可以查看如下链接:",-1),o={href:"https://blog.csdn.net/dimudan2015/article/details/81910690",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"另一种是使用 MappedByteBuffer，对 MappedByteBuffer 不熟悉的朋友，可以查看如下链接进行了解:",-1),b={href:"https://www.jianshu.com/p/f90866dcbffc",target:"_blank",rel:"noopener noreferrer"},h=a(`<h2 id="后端进行写入操作的核心代码" tabindex="-1"><a class="header-anchor" href="#后端进行写入操作的核心代码" aria-hidden="true">#</a> 后端进行写入操作的核心代码</h2><h3 id="_1、randomaccessfile-实现方式" tabindex="-1"><a class="header-anchor" href="#_1、randomaccessfile-实现方式" aria-hidden="true">#</a> 1、RandomAccessFile 实现方式</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@UploadMode(mode = UploadModeEnum.RANDOM_ACCESS)  
@Slf4j  
public class RandomAccessUploadStrategy extends SliceUploadTemplate {  
  
  @Autowired  
  private FilePathUtil filePathUtil;  
  
  @Value(&quot;\${upload.chunkSize}&quot;)  
  private long defaultChunkSize;  
  
  @Override  
  public boolean upload(FileUploadRequestDTO param) {  
    RandomAccessFile accessTmpFile = null;  
    try {  
      String uploadDirPath = filePathUtil.getPath(param);  
      File tmpFile = super.createTmpFile(param);  
      accessTmpFile = new RandomAccessFile(tmpFile, &quot;rw&quot;);  
      //这个必须与前端设定的值一致  
      long chunkSize = Objects.isNull(param.getChunkSize()) ? defaultChunkSize * 1024 * 1024  
          : param.getChunkSize();  
      long offset = chunkSize * param.getChunk();  
      //定位到该分片的偏移量  
      accessTmpFile.seek(offset);  
      //写入该分片数据  
      accessTmpFile.write(param.getFile().getBytes());  
      boolean isOk = super.checkAndSetUploadProgress(param, uploadDirPath);  
      return isOk;  
    } catch (IOException e) {  
      log.error(e.getMessage(), e);  
    } finally {  
      FileUtil.close(accessTmpFile);  
    }  
   return false;  
  }  
  
}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、mappedbytebuffer-实现方式" tabindex="-1"><a class="header-anchor" href="#_2、mappedbytebuffer-实现方式" aria-hidden="true">#</a> 2、MappedByteBuffer 实现方式</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@UploadMode(mode = UploadModeEnum.MAPPED_BYTEBUFFER)  
@Slf4j  
public class MappedByteBufferUploadStrategy extends SliceUploadTemplate {  
  
  @Autowired  
  private FilePathUtil filePathUtil;  
  
  @Value(&quot;\${upload.chunkSize}&quot;)  
  private long defaultChunkSize;  
  
  @Override  
  public boolean upload(FileUploadRequestDTO param) {  
  
    RandomAccessFile tempRaf = null;  
    FileChannel fileChannel = null;  
    MappedByteBuffer mappedByteBuffer = null;  
    try {  
      String uploadDirPath = filePathUtil.getPath(param);  
      File tmpFile = super.createTmpFile(param);  
      tempRaf = new RandomAccessFile(tmpFile, &quot;rw&quot;);  
      fileChannel = tempRaf.getChannel();  
  
      long chunkSize = Objects.isNull(param.getChunkSize()) ? defaultChunkSize * 1024 * 1024  
          : param.getChunkSize();  
      //写入该分片数据  
      long offset = chunkSize * param.getChunk();  
      byte[] fileData = param.getFile().getBytes();  
      mappedByteBuffer = fileChannel  
.map(FileChannel.MapMode.READ_WRITE, offset, fileData.length);  
      mappedByteBuffer.put(fileData);  
      boolean isOk = super.checkAndSetUploadProgress(param, uploadDirPath);  
      return isOk;  
  
    } catch (IOException e) {  
      log.error(e.getMessage(), e);  
    } finally {  
  
      FileUtil.freedMappedByteBuffer(mappedByteBuffer);  
      FileUtil.close(fileChannel);  
      FileUtil.close(tempRaf);  
  
    }  
  
    return false;  
  }  
  
}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、文件操作核心模板类代码" tabindex="-1"><a class="header-anchor" href="#_3、文件操作核心模板类代码" aria-hidden="true">#</a> 3、文件操作核心模板类代码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Slf4j  
public abstract class SliceUploadTemplate implements SliceUploadStrategy {  
  
  public abstract boolean upload(FileUploadRequestDTO param);  
  
  protected File createTmpFile(FileUploadRequestDTO param) {  
  
    FilePathUtil filePathUtil = SpringContextHolder.getBean(FilePathUtil.class);  
    param.setPath(FileUtil.withoutHeadAndTailDiagonal(param.getPath()));  
    String fileName = param.getFile().getOriginalFilename();  
    String uploadDirPath = filePathUtil.getPath(param);  
    String tempFileName = fileName + &quot;_tmp&quot;;  
    File tmpDir = new File(uploadDirPath);  
    File tmpFile = new File(uploadDirPath, tempFileName);  
    if (!tmpDir.exists()) {  
      tmpDir.mkdirs();  
    }  
    return tmpFile;  
  }  
  
  @Override  
  public FileUploadDTO sliceUpload(FileUploadRequestDTO param) {  
  
    boolean isOk = this.upload(param);  
    if (isOk) {  
      File tmpFile = this.createTmpFile(param);  
      FileUploadDTO fileUploadDTO = this.saveAndFileUploadDTO(param.getFile().getOriginalFilename(), tmpFile);  
      return fileUploadDTO;  
    }  
    String md5 = FileMD5Util.getFileMD5(param.getFile());  
  
    Map&lt;Integer, String&gt; map = new HashMap&lt;&gt;();  
    map.put(param.getChunk(), md5);  
    return FileUploadDTO.builder().chunkMd5Info(map).build();  
  }  
  
  /**  
   * 检查并修改文件上传进度  
   */  
  public boolean checkAndSetUploadProgress(FileUploadRequestDTO param, String uploadDirPath) {  
  
    String fileName = param.getFile().getOriginalFilename();  
    File confFile = new File(uploadDirPath, fileName + &quot;.conf&quot;);  
    byte isComplete = 0;  
    RandomAccessFile accessConfFile = null;  
    try {  
      accessConfFile = new RandomAccessFile(confFile, &quot;rw&quot;);  
      //把该分段标记为 true 表示完成  
      System.out.println(&quot;set part &quot; + param.getChunk() + &quot; complete&quot;);  
      //创建conf文件文件长度为总分片数，每上传一个分块即向conf文件中写入一个127，那么没上传的位置就是默认0,已上传的就是Byte.MAX_VALUE 127  
      accessConfFile.setLength(param.getChunks());  
      accessConfFile.seek(param.getChunk());  
      accessConfFile.write(Byte.MAX_VALUE);  
  
      //completeList 检查是否全部完成,如果数组里是否全部都是127(全部分片都成功上传)  
      byte[] completeList = FileUtils.readFileToByteArray(confFile);  
      isComplete = Byte.MAX_VALUE;  
      for (int i = 0; i &lt; completeList.length &amp;&amp; isComplete == Byte.MAX_VALUE; i++) {  
        //与运算, 如果有部分没有完成则 isComplete 不是 Byte.MAX_VALUE  
        isComplete = (byte) (isComplete &amp; completeList[i]);  
        System.out.println(&quot;check part &quot; + i + &quot; complete?:&quot; + completeList[i]);  
      }  
  
    } catch (IOException e) {  
      log.error(e.getMessage(), e);  
    } finally {  
      FileUtil.close(accessConfFile);  
    }  
 boolean isOk = setUploadProgress2Redis(param, uploadDirPath, fileName, confFile, isComplete);  
    return isOk;  
  }  
  
  /**  
   * 把上传进度信息存进redis  
   */  
  private boolean setUploadProgress2Redis(FileUploadRequestDTO param, String uploadDirPath,  

      String fileName, File confFile, byte isComplete) {  
  
    RedisUtil redisUtil = SpringContextHolder.getBean(RedisUtil.class);  
    if (isComplete == Byte.MAX_VALUE) {  
      redisUtil.hset(FileConstant.FILE_UPLOAD_STATUS, param.getMd5(), &quot;true&quot;);  
      redisUtil.del(FileConstant.FILE_MD5_KEY + param.getMd5());  
      confFile.delete();  
      return true;  
    } else {  
      if (!redisUtil.hHasKey(FileConstant.FILE_UPLOAD_STATUS, param.getMd5())) {  
        redisUtil.hset(FileConstant.FILE_UPLOAD_STATUS, param.getMd5(), &quot;false&quot;);  
        redisUtil.set(FileConstant.FILE_MD5_KEY + param.getMd5(),  
            uploadDirPath + FileConstant.FILE_SEPARATORCHAR + fileName + &quot;.conf&quot;);  
      }  
  
      return false;  
    }  
  }  

  /**  
   * 保存文件操作  
   */  
  public FileUploadDTO saveAndFileUploadDTO(String fileName, File tmpFile) {  
  
    FileUploadDTO fileUploadDTO = null;  
  
    try {  
  
      fileUploadDTO = renameFile(tmpFile, fileName);  
      if (fileUploadDTO.isUploadComplete()) {  
        System.out  
            .println(&quot;upload complete !!&quot; + fileUploadDTO.isUploadComplete() + &quot; name=&quot; + fileName);  
        //TODO 保存文件信息到数据库  
  
      }  
  
    } catch (Exception e) {  
      log.error(e.getMessage(), e);  
    } finally {  
  
    }  
    return fileUploadDTO;  
  }  
  
  /**  
   * 文件重命名  
   *  
   * @param toBeRenamed 将要修改名字的文件  
   * @param toFileNewName 新的名字  
   */  
  private FileUploadDTO renameFile(File toBeRenamed, String toFileNewName) {  
    //检查要重命名的文件是否存在，是否是文件  
    FileUploadDTO fileUploadDTO = new FileUploadDTO();  
    if (!toBeRenamed.exists() || toBeRenamed.isDirectory()) {  
      log.info(&quot;File does not exist: {}&quot;, toBeRenamed.getName());  
      fileUploadDTO.setUploadComplete(false);  
      return fileUploadDTO;  
    }  
    String ext = FileUtil.getExtension(toFileNewName);  
    String p = toBeRenamed.getParent();  
    String filePath = p + FileConstant.FILE_SEPARATORCHAR + toFileNewName;  
    File newFile = new File(filePath);  
    //修改文件名  
    boolean uploadFlag = toBeRenamed.renameTo(newFile);  
  
    fileUploadDTO.setMtime(DateUtil.getCurrentTimeStamp());  
    fileUploadDTO.setUploadComplete(uploadFlag);  
    fileUploadDTO.setPath(filePath);  
    fileUploadDTO.setSize(newFile.length());  
    fileUploadDTO.setFileExt(ext);  
    fileUploadDTO.setFileId(toFileNewName);  
  
    return fileUploadDTO;  
  }  
}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>在实现分片上传的过程，需要前端和后端配合，比如前后端上传块号的文件大小，前后端必须得要一致，否则上传就会有问题。其次文件相关操作正常都是要搭建一个文件服务器的，比如使用 fastdfs、hdfs 等。</p><p>本示例代码在电脑配置为 4 核内存 8G 情况下，上传 24G 大小的文件，上传时间需要 30 多分钟，主要时间耗费在前端的 md5 值计算，后端写入的速度还是比较快。</p><p>如果项目组觉得自建文件服务器太花费时间，且项目的需求仅仅只是上传下载，那么推荐使用阿里的 oss 服务器，其介绍可以查看官网:</p>`,11),f={href:"https://help.aliyun.com/product/31815.html",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"阿里的 oss 它本质是一个对象存储服务器，而非文件服务器，因此如果有涉及到大量删除或者修改文件的需求，oss 可能就不是一个好的选择。",-1),F=e("p",null,"文末提供一个 oss 表单上传的链接 demo，通过 oss 表单上传，可以直接从前端把文件上传到 oss 服务器，把上传的压力都推给 oss 服务器:",-1),_={href:"https://www.cnblogs.com/ossteam/p/4942227.html",target:"_blank",rel:"noopener noreferrer"},U=e("hr",null,null,-1),D={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},O={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,[i("微信搜 "),e("strong",null,"沉默王二"),i(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),e("strong",null,"222"),i(" 即可免费领取。")],-1),T=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function C(x,k){const n=d("ExternalLinkIcon");return r(),t("div",null,[c,e("p",null,[e("a",u,[i("http://fex.baidu.com/webuploader/getting-started.html"),l(n)])]),m,e("p",null,[e("a",o,[i("https://blog.csdn.net/dimudan2015/article/details/81910690"),l(n)])]),p,e("p",null,[e("a",b,[i("https://www.jianshu.com/p/f90866dcbffc"),l(n)])]),h,e("p",null,[e("a",f,[i("https://help.aliyun.com/product/31815.html"),l(n)])]),g,F,e("p",null,[e("a",_,[i("https://www.cnblogs.com/ossteam/p/4942227.html"),l(n)])]),U,e("p",null,[i("GitHub 上标星 10000+ 的开源知识库《"),e("a",D,[i("二哥的 Java 进阶之路"),l(n)]),i("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),e("a",O,[i("太赞了，GitHub 上标星 10000+ 的 Java 教程"),l(n)])]),S,T])}const P=s(v,[["render",C],["__file","mianshiguan-bigfile-miaochuan.html.vue"]]);export{P as default};
