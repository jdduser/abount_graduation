#  coding: utf-8
import os
ls=os.linesep


fwrite=open('./text/text1.parse.txt','w')


fread = open("./text/text1.txt")             # 返回一个文件对象
line = fread.readline()             # 调用文件的 readline()方法
while line:
    if('）：' in line):       #提取该集里面说过话的人及说过的话的第一句
        print line                  # 后面跟 ',' 将忽略换行符
        fwrite.writelines(line)
    # print(line, end = '')　　　# 在 Python 3中使用
    line = fread.readline()

fread.close()
fwrite.close()
print 'DONE!'