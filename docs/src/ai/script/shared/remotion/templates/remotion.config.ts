/**
 * remotion.config.ts · Remotion 配置
 * 视频尺寸 1920×1080，30fps
 */
import { Config } from "@remotion/cli/config";

Config.setEntryPoint("src/Root.tsx");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
