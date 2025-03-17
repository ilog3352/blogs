## ffmpeg
1. 基本格式转换 gif mp4 avi 等 `ffmpeg -i test.mp4 test.gif`
2. 提取视频中的音频  `ffmpeg -i test.mp4 test.mp3`
3. 裁剪视频     `ffmpeg -ss 5 -to 10 -i mov_bbb.mp4 test1.mp4`
4. 加水印          `ffmpeg -i mov_bbb.mp4 -vf drawtext=fontsize=30:text="Hello":x=10:y=10:fontcolor=red test2.mp4`
5. 删除水印         `ffmpeg -i test2.mp4 -vf delogo=w=150:h=30:x=10:y=10  test3.mp4`