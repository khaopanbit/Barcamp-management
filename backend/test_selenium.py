from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from unittest import TestCase

class SeleniumTestCase(TestCase):
    
    def setUp(self):
        '''setup chromedriver to run headless'''
        options = Options()
        options.add_argument("--headless")
        self.driver = webdriver.Chrome(chrome_options=options)
        self.driver.implicitly_wait(30)


    def test_signin(self):
        speaker = list()
        driver = self.driver
        driver.get("https://barcamp-management.herokuapp.com/")  
        driver.find_element_by_id("Sign in").click()


    def test_addspeaker(self):
        '''add a speaker in to the list'''
        speaker = list()
        driver = self.driver
        driver.get("https://barcamp-management.herokuapp.com/")  
        
        


    def test_vote(self):
        '''when audience vote the topic to listen'''
    

