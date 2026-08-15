print("Welcome to the Doravin Prayanam game!👧🐒")
print("🎯","-"*50,"🎯")
print("Your mission is to deliver a gift to Bujji's house.The map shows three routes on your journey, Mountain River School,  You must cross all three places to reach Bujji's house.Let's start the adventure!")
print("A Mountain Ghost is waiting on the mountain.It will ask you a riddle.You have only 2 chances to answer correctly.Answer correctly to continue your journey.If you fail, the ghost will not let you pass.")
print("⛰️","-"*50,"⛰️")
mount_gost_riddle="I have keys but no locks. I have space but no room. You can enter but not go outside. What am I?"
print(mount_gost_riddle)
#first for loop for the mountain ghost riddle

for i in range(0,2):
    answer=str(input("What am I? "))
    if answer=="keyboard":
            print("Correct! The answer is 'keyboard'.") 
            print("You have solved the riddle!,go to the next place")
            break
    
    else:
            print("mountgost:Incorrect! Try again.")
            print("mountgost:You have",2-i-1, "attempts left.")
            print("mountgost:The riddle is: I have keys but no locks. I have space but no room. You can enter but not go outside. What am I?")
            print("mountgost:hint: It is an input device for computers.")
            print("mountgost:give your best")
            exit()
            
else:
        print("Sorry, you have used all your attempts. The correct answer is 'keyboard'.")
#second for loop for the river crossing
print("The second place is the River.You will find a boat, a bike, and a bicycle.Choose one to continue your journey.Your choice will decide whether you can cross the river or not.Choose wisely!")
print("you have 2 chances only")
print("🚣","__"*50,"🚣")
for i in range(0,2):
        answer=str(input("what will you choose: boat,bike,cycle:"))
        if answer=="boat":
            print("you succesfully crossed the river,go to the next place")
            break
                    
            
        else:
            if (i<2):
             print("you are not allowed to cross the river you will not reach bujji house")
             exit()
#for loop for the fox
print("On your way, a clever fox appears.Quick! Type -kulla nari thiruda koodathu- It will scare the fox away,if you shout it correctly you will keep your gift safe")
print("🦊","__"*50,"🦊")
for i in range(0,2):
        answer=str(input("what will you shout? "))
        if answer=="kulla nari thiruda koodathu":
                print("you shouted correctly, the fox is scared away and your gift is safe!")
                break
        else:
                print("Incorrect! Try again.")
                print("You have",2-i-1, "attempts left.")
                print("hint: It is a phrase in Tamil that means 'the fox should not steal'.")
else:
        print("Sorry, you have used all your attempts. The correct answer is 'kulla nari thiruda koodathu'.")
        exit()
#fourth for loop for the math problem
print("The third place is the School.A Math teacher will challenge you with a math question.Answer it correctly to continue your journey.If your answer is incorrect, you will not be allowed to proceed.")
print("you have ten sec to think about the question,if you answer wrong you will lose your gift")
import time
question=(("multiple of 10"))
print ("the problem is",question)
time.sleep(10)
for i in range(0,2):
        answer=int(input("what is the answer? "))
        if answer%10==0:
                print("you answered correctly, you go to bujji house and keep your gift safe")
                break
        elif answer!=0:
                print("Incorrect! Try again.")
                print("You have",2-i-1, "att40empts left.")
        else:
                print("Sorry, you have used all your attempts.")
                exit()
print("congratulations! You have completed the Doravin Prayanam game and give the gift to bujji,your doing good job,keep it up.🏠🏘️🏚️🏡")
        