package com.cmower.java_demo.nio;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.AsynchronousFileChannel;
import java.nio.channels.CompletionHandler;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.ExecutionException;

public class Wanger {

public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
	Path file = Paths.get("沉默王二.txt");
	AsynchronousFileChannel channel = AsynchronousFileChannel.open(file);
	channel.read(ByteBuffer.allocate(100_000), 0, null, new CompletionHandler<Integer, ByteBuffer>() {
		public void completed(Integer result, ByteBuffer attachment) {
			System.out.println(result);
		}
		
		public void failed(Throwable exc, ByteBuffer attachment) {
			System.out.println(exc.getMessage());
		}
	});
	
	System.out.println("主线程继续做事情");

}

}
