#  coding: utf-8

#用来爬取可视化相关数据，结果存储在对应的json文件中
import urllib2
import re
import csv
import codecs
from bs4 import BeautifulSoup
# write json
import os
import json

import requests

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

#documentary films urls
#youku  http://list.youku.com/category/show/c_84_s_1_d_1.html?spm=a2h1n.8251845.selectID.5!2~5~5!2~1~3~A
#iqiyi  http://top.iqiyi.com/jilupian.html
#tecent https://v.qq.com/x/list/doco?sort=18&offset=0&ipay=-1


#youku data
def getykdata():
    data = []
    print "Getting youku data ...."
    url = "http://list.youku.com/category/show/c_84_s_1_d_1.html?spm=a2h1n.8251845.selectID.5!2~5~5!2~1~3~A"
    toppage = urllib2.urlopen(url)  # get page
    topsoup = BeautifulSoup(toppage,'lxml')  #  parsing the web page

    ALL = topsoup.findAll(attrs={'class': ['yk-pack pack-film']})
    num = 0
    for each in ALL:   #iterate the above selected tags
        if(num<10):   #取top10
            num = num + 1
            #print str(num) + ':'
            ########       链接
            link = 'http:'+each.contents[0].contents[0].attrs['href']
            #print link
            ########    score  换个页面解析
            detailpage = urllib2.urlopen(link)
            detailsoup = BeautifulSoup(detailpage, 'lxml')
            detailscore = detailsoup.findAll(attrs={'class': ['score']})
            score=detailscore[0].contents[0].next+detailscore[0].contents[0].nextSibling
            #print score
            ########   简介
            summary = detailsoup.findAll(attrs={'class': ['summary']})[0].text
            #print summary
            ########   tag
            tags = detailsoup.findAll(attrs={'class': ['v-tag']})
            types = []
            for eachtag in tags:
                types.append(eachtag.text)
            #print types
            ######## number of comments
            numOfComments = detailsoup.findAll(attrs={'class': ['current comment-show']})
            #######     名字
            name = each.contents[0].contents[0].attrs['title']
            #print name
            #播放量vv
            vv = each.contents[2].contents[1].text
            if('万次播放' not in vv):
                vv = each.contents[2].contents[2].text
            if('万' in vv):
                vv = re.match(r'[\d||.]*',vv).group(0)
            item={'no':num,'name':name,'link':link,'vv':vv,'score':score,'tag':types,'summary':summary,'numOfComments':numOfComments}

            #print item
            data.append(item)
    print data
    output_dir = './resultsJson'
    emb_filename = os.path.join(output_dir, 'youku.json')  
    jsObj = json.dumps(data)
    with open(emb_filename, "w") as f:  
        f.write(jsObj)  
        f.close()


#获取爱奇艺相关数据（评分还有评论数没有获取到,因为数据是从服务器端作为某函数的参数然后执行js）
def getiqiyidata():
    data = []
    print "Getting iqiyi data ...."
    url = "http://top.iqiyi.com/jilupian.html"
    toppage = urllib2.urlopen(url)  # get page
    topsoup = BeautifulSoup(toppage,'lxml')  #  parsing the web page

    ALL = topsoup.findAll(attrs={'class': ['fl clearfix topDetails-con']})
    num = 0
    for each in ALL:   #iterate the above selected tags
        if(num<10):   #取top10
            num = num + 1
            #print str(num) + ':'
            ########       链接
            link = each.contents[1].contents[1].attrs['href']
            #print link
            ########    score  换个页面解析
            detailpage = urllib2.urlopen(link)
            detailsoup = BeautifulSoup(detailpage, 'lxml')
            detailscore = detailsoup.findAll(attrs={'class': ['score_font']})
            #score=detailscore[0].contents[0].next+detailscore[0].contents[0].nextSibling
            #tvid = detailscore[0].attrs['data-score-tvid']
            #url1 = 'http://score - video.iqiyi.com / beaver - api / get_sns_score?qipu_ids ='+tvid+' & appid = 21 & tvid = '+tvid +'& pageNo = 1 & callback = window.Q.__callbacks__.cbe2mgwu'
            #res= urllib2.urlopen(url1)  # get page
            #wbdata = requests.get(url1)
            score = None
            #print score
            ########   简介
            summarytool=detailsoup.findAll(attrs={'class': ['showMoreText']})
            if(summarytool):
                dataMoreorLess = False
                for eachsummary in summarytool:
                    if(eachsummary.attrs['data-moreorless']=='moreinfo'):
                        dataMoreorLess = True
                if(dataMoreorLess):
                    summary = summarytool[1].contents[1].text
                else:
                    summary = summarytool[0].contents[1].text
                #print summary
            else:
                print 'other'
            ########   tag
            tags = detailsoup.findAll(attrs={'class': ['topic_item clearfix']})
            if(tags):
                type = tags[0].contents[3].contents[1].contents[1].text
                #print type
            else:
                tags = detailsoup.findAll(attrs={'class':['large-block fl']})
                type = tags[0].contents[3].contents[1].contents[0]
                #print type
            ######## number of comments
            #numOfComments = detailsoup.findAll(attrs={'class': ['current comment-show']})
            numOfComments = None
            #######     名字
            name = each.contents[1].contents[1].attrs['title']
            #print name
            #播放量vv
            vv = each.contents[3].contents[5].text
            if('万' in vv):
                vv = vv.replace('万','')
                vv = float(vv)
            else:
                vv= vv.replace(',','')
                vvtext=(float(vv))/10000
                vv = round(vvtext,2)
            #print vv
            item = {'no': num, 'name': name, 'link': link, 'vv': vv, 'score': score, 'tag': type, 'summary': summary,
                    'numOfComments': numOfComments}
            #item={'no':num,'name':name,'link':link,'vv':vv,'tag':type}
            #print item
            data.append(item)
    print data
    output_dir = './resultsJson'
    emb_filename = os.path.join(output_dir, 'iqiyi.json')
    jsObj = json.dumps(data)
    with open(emb_filename, "w") as f:
        f.write(jsObj)
        f.close()

def gettecentdata():
    data = []
    print "Getting iqiyi data ...."
    url = "https://v.qq.com/x/list/doco?sort=18&offset=0&ipay=-1"
    toppage = urllib2.urlopen(url)  # get page
    topsoup = BeautifulSoup(toppage, 'lxml')  # parsing the web page

    ALL = topsoup.findAll(attrs={'class': ['fl clearfix topDetails-con']})



getykdata()
getiqiyidata()