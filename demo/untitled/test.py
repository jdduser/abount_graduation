#  coding: utf-8

import urllib2
import re
import csv
import codecs
from bs4 import BeautifulSoup

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

csv_reader = csv.reader(open('csv_test.csv', 'r'))
for row in csv_reader:
    print(row)


