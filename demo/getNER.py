
# -*- coding: utf-8 -*-
import codecs
import re
import json

documentarytype="科学类纪录片".decode('utf-8')
documentaryname="互联网时代".decode('utf-8')
documentarydetail="互联网时代e01".decode('utf-8')
#读取命名实体识别的结果
file=codecs.open('out_nerfile.txt','r',encoding='utf8')
file_content = file.read()
#以空格为切割标志，使每个命名实体标注词组为列表的一个元素
file_list = file_content.split()

#创建两个空列表，分别保存命名实体和构成命名实体短语词组的各个词
wordlist=[]
joinword=''
#使用正则表达式，判断单个词是否是命名实体
for word in file_list:
    nertype = word.split('/')[1]
    realword = word.split('/')[0]
    #print nertype
    if(re.search(r'^S-Nh',nertype)):
        print 'people:' + realword
        wordlist.append(realword)
    # elif re.search(r'^S-Ns',nertype):
    #     print 'place:'.encode('utf-8') + realword
    #     wordlist.append(realword)
    # elif re.search(r'^S-Ni',nertype):
    #     print 'insitution:'.encode('utf-8') + realword
    #     wordlist.append(realword)
    # elif re.search(r'^B',nertype):
    #     joinword=joinword+realword
    # elif re.search(r'^I', nertype):
    #     joinword=joinword+realword
    # elif re.search(r'^E', nertype):
    #     joinword = joinword + realword
    #     print joinword
    #     wordlist.append(realword)
    #     joinword = ''
    else:
        print
print wordlist

#filewrite=codecs.open('result.json','r',encoding='utf8')
#file_content_write = filewrite.read()
filewrite = open('result.json', "rb")
fileJson = json.load(filewrite)
obj={}
for item in wordlist:
    print item
    obj[item]={"value": item}

fileJson["纪录片".decode('utf-8')]["包含种类".decode('utf-8')]["data"][documentarytype]["data"]["所含纪录片".decode('utf-8')]["data"][documentaryname]["data"]["包含集数".decode('utf-8')]["data"][documentarydetail]["data"]["包含内容".decode('utf-8')]["data"]=obj
print obj

out_file = codecs.open('result.json', 'w', encoding='utf8')
out_file.write(json.dumps(fileJson,ensure_ascii = False))