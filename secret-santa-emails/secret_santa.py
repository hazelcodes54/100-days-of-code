from dotenv import load_dotenv
import os
import random
import smtplib
import ssl
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr

load_dotenv()


def send_email(sender, receiver, recipient):
    password = os.environ['password']
    subject = 'Your Secret Santa Present'
    body = f"""
Hi! Your secret santa is: {recipient}! 🎅
Remember to spend 10$-20$ on your gift, but don't stress about it being the perfect gift!
"""
    msg = MIMEText(body, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = formataddr(('Secret Santa', sender))
    msg['To'] = receiver
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())


names_and_emails = [
  ['Asiqur', 'asiqur@codedex.io'],
  ['Dharma', 'dharma@codedex.io'],
  ['Jerry', 'jerry@codedex.io'],
  ['Lillian', 'lillian@codedex.io'],
  ['Malcolm', 'malcolm@codedex.io'],
  ['Rose', 'rose@codedex.io'],
  ['Sonny', 'sonny@codedex.io'],
]

if len(names_and_emails) <= 1:
  print('Not enough people to start secret santa!')
  quit()

first_name = names_and_emails[0][0]

while len(names_and_emails) >= 2:
  send_email('hazelatnewtown@gmail.com', names_and_emails[0][1], names_and_emails[1][0])
  names_and_emails.pop(0)
  random.shuffle(names_and_emails)

send_email('hazelatnewtown@gmail.com', names_and_emails[0][1], first_name)