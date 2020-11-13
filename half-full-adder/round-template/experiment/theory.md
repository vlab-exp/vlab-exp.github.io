### Introduction
 
Adders are digital circuits that carry out addition of numbers. Adders are a key component of arithmetic logic unit. Adders can be constructed for most of the numerical representations like Binary Coded Decimal (BDC), Excess – 3, Gray code, Binary etc. out of these, binary addition is the most frequently performed task by most common adders. Apart from addition, adders are also used in certain digital applications like table index calculation, address decoding etc.
<br><br>
Binary addition is similar to that of decimal addition. Some basic binary additions are shown below.<br>
<center><img src="images/1.1.png" >
<br><b> Schematic representation of half adder</b></center><br>
                 
### 1)Half Adder 
<br>
                    
Half adder is a combinational circuit that performs simple addition of two binary numbers. The block diagram of a half adder is shown below.<br>                         <br>
                
### 1.1)Half Adder Truth Table 
<br>
              
If we assume A and B as the two bits whose addition is to be performed, a truth table for half adder with A, B as inputs and Sum, Carry as outputs can be tabulated as follows.<br>
                       
The sum output of the binary addition carried out above is similar to that of an Ex-OR operation while the carry output is similar to that of an AND operation. The same can be verified with help of Karnaugh Map.<br><br> 
<center><img src="images/3.3.png" >&nbsp;&nbsp;&nbsp;
                              
<img src="images/2.2.png" ></center>
                        <br>
                    
The truth table and K Map simplification for sum output is shown below.<br>

<center><img src="images/4.4.png" >&nbsp;&nbsp;&nbsp;
                              
<img src="images/5.5.png" >&nbsp;&nbsp;&nbsp;

<img src="images/6.6.png" ><br><br>
                       
<b>Sum = A B' + A' B</b></center><br>
             
The truth table and K Map simplification for carry is shown below.<br>
                        
<center><img src="images/7.7.png" >&nbsp;&nbsp;&nbsp;
<img src="images/8.8.png" >&nbsp;&nbsp;&nbsp;
<img src="images/9.9.png"><br>
<br>
                        
<b>Carry = AB</b><br></center>
                        
If A and B are binary inputs to the half adder, then the logic function to calculate sum S is Ex – OR of A and B and logic function to calculate carry C is AND of A and B. Combining these two, the logical circuit to implement the combinational circuit of half adder is shown below.<br>
                        
<center> <img src="images/10.10.png" ><br><br><br><b>Half Adder Logic Diagram</b></center>
                        <br>
                      
As we know that NAND and NOR are called universal gates as any logic system can be implemented using these two, the half adder circuit can also be implemented using them. We know that a half adder circuit has one Ex – OR gate and one AND gate.<br>
                 
#### 1.2)Half Adder using NAND gates </h2><br>

Five NAND gates are required in order to design a half adder. The circuit to realize half adder using NAND gates is shown below.<br>

<center><img src="images/11.11.png" ><br><b>Realization of half adder using NAND gates</b></center><br>
                      
#### 1.3)Half Adder using NOR gates 
<br>
                    
Five NOR gates are required in order to design a half adder. The circuit to realize half adder using NOR gates is shown below.<br>
<center><img src="images/12.12.png" ><br><b>Realization of half adder using NOR Gates</b></center><br>
                   

### 2)Full Adder 
<br>
                   
Full adder is a digital circuit used to calculate the sum of three binary bits which is the main difference between full adder and half adder. Full adders are complex and difficult to implement when compared to half adders. Two of the three bits are same as before which are A, the augend bit and B, the addend bit. The additional third bit is carry bit from the previous stage and is called 'Carry' – in generally represented by CIN. It calculates the sum of three bits along with the carry. The output carry is called Carry – out and is represented by COUT.<br>
                       
The block diagram of a full adder with A, B and CIN as inputs and S, COUT as outputs is shown below.<br>
<center><img src="images/14.14.png" >
<img src="images/15.15.png" ><br>
<b>Full Adder Block Diagram and Truth Table</b></center><br>
         
Based on the truth table, the Boolean functions for Sum (S) and Carry – out (COUT) can be derived using K – Map.</p><br>
<center> <img src="images/16.16.png" style="height: 230px; width: 360px;">
<img src="images/17.17.png" style="height: 230px; width: 360px;"><br></center>
The simplified equation for sum is S =  A'B'Cin + A'BCin' + ABCin<br>
The simplified equation for COUT is COUT = AB + ACIN + BCIN<br>
                     
In order to implement a combinational circuit for full adder, it is clear from the equations derived above, that we need four 3-input AND gates and one 4-input OR gates for Sum and three 2-input AND gates and one 3-input OR gate for Carry – out.</p><br><br>

<center><img src="images/18.18.png" ><br><br>
                         
<b>Full Adder Logic Diagram</b></center><br></p><br>
                         
#### 2.1)Full Adder using NAND gates 
<br>
As mentioned earlier, a NAND gate is one of the universal gates and can be used to implement any logic design. The circuit of full adder using only NAND gates is shown below.<br>
<center><img src="images/19.19.png" style="height: 300px; width: 780px;"><br>

<b>Full Adder using NAND gates</b></center><br>
                       
#### 2.2)Full Adder using NOR gates
<br>
As mentioned earlier, a NOR gate is one of the universal gates and can be used to implement any logic design. The circuit of full adder using only NOR gates is shown below.<br>
<center> <img src="images/20.20.png" style="height: 340px; width: 780px;"><br>
<b>Full Adder using NOR gates</b></center> <br>
                           


