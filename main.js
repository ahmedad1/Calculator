// let ajax=new XMLHttpRequest();
// ajax.open('get','test.json')
// ajax.send()
// ajax.onreadystatechange=()=>{
//     console.log(this.responseText)
// }
let inptext=document.querySelector('input[type=text]')
let inpbtn=document.querySelectorAll('input[type=button]')
let eqtext=document.querySelector('.disabled')
let success=0;
let reg=/(\/\*)|(\*\/)|(\+\*)|(\-\*)|(\*\*)|(\/\/)|(\+\/)|(\-\/)|[a-z]|[A-Z]|^\/|^\*|\/$|\*$|\+$|\-$/ig
class node{
    constructor(i,n){

       this.item=i;
       this.next=n;
    }
}
class Stack{
    
    constructor(){
        this.top=null;
    }
    push(data) {
        let newnode=new node(data,this.top);
    
            this.top=newnode;
        
    }
    pop(){
        this.top=this.top.next;
        
    }
    isempty(){
        return this.top==null
    }
    print(){
        let temp=this.top;
        while(temp!=null){
            console.log(temp.item)
            temp=temp.next;
        }
    }
    topf(){
        return !this.isempty()? this.top.item:'No item';
    }
}
onload=function(){
    inptext.focus();
}
// let keybd=new KeyboardEvent('')

inptext.onkeypress=function(e){
    
    
    if (e.charCode==13){
    if (!reg.test(inptext.value)&&inptext.value.length!=0){
    inpbtn[14].click();
    success=1
    }
}
else{
    let oper='+-*/';
    if(success){
        if(e.charCode==oper.charCodeAt(0)||e.charCode==oper.charCodeAt(1)
        ||e.charCode==oper.charCodeAt(2)||e.charCode==oper.charCodeAt(3)
        ){

            inptext.value=eqtext.value.slice(2)
            eqtext.value='';
            success=0;
        }
        else{
        inptext.value=''
        eqtext.value=''
        success=0}
    }
}


}
window.onkeydown=()=>{
    inptext.focus()
    inptext.setSelectionRange(inptext.value.length,inptext.value.length)

}
function number(){
    
    if (this.value!="="){
        let oper='+-*/';
    if(!success){
    inptext.value+=this.value;

            }
    else{
        
        if(this.value==oper[0]||this.value==oper[1]||this.value==oper[2]||this.value==oper[3]){

            inptext.value=eqtext.value.slice(2)
            inptext.value+=this.value
            eqtext.value=''
            
        }
        else{
            inptext.value=this.value;
            eqtext.value=''
        }
        success=0
        
    }

}
else{
   
    
    if (!reg.test(inptext.value)&&inptext.value.length!=0){
let x=eval(simplify(inptext.value))
eqtext.value=`= ${x}`
success=1
}
}
}
inpbtn[0].onclick=number;
inpbtn[1].onclick=number;
inpbtn[2].onclick=number;
inpbtn[3].onclick=number;
inpbtn[4].onclick=number;
inpbtn[5].onclick=number;
inpbtn[6].onclick=number;
inpbtn[7].onclick=number;
inpbtn[8].onclick=number;
inpbtn[9].onclick=number;
inpbtn[10].onclick=number;
inpbtn[11].onclick=number;
inpbtn[12].onclick=number;
inpbtn[13].onclick=number;
inpbtn[14].onclick=number;
inpbtn[15].onclick=number;



function greater(o1,o2){
    if((o1=='+'||o1=='-')&&(o2=='*'||o2=='/')){
        return o2;
    }
    else if ((o2=='+'||o2=='-')&&(o1=='*'||o1=='/')){
        return o1;
    }
    else{
        return -1;
    }

}
function simplify(exp){
    let bool=0;
    let newstr='';
let stack=new Stack();
for (let i=0; i<exp.length;i++){
if (!isNaN(+exp[i])||exp[i]=='.'||((exp[i]=='+'||exp[i]=='-')&&((i==0)||(exp[i-1]!='.'&&isNaN(+exp[i-1]))))){
newstr+=exp[i];
bool++;
}
else{
    if (bool>=1){
        bool=0;
        newstr+=',';

    }
    if (stack.isempty()){
        stack.push(exp[i]);
    }
    else if(exp[i]==greater(stack.topf(),exp[i])){
        stack.push(exp[i]);
    }
    else if (stack.topf()==greater(exp[i],stack.topf())||greater(exp[i],stack.topf())==-1){
        
        newstr+=stack.topf();
        stack.pop();
        stack.push(exp[i]);
        newstr+=','

    }
}

}
while(!stack.isempty()){
    if (bool>=1){
        bool=0;
        newstr+=',';

    }
    newstr+=stack.topf();
    stack.pop()
}
return newstr
}
function eval(simpl){
    let num='';
    let stack=new Stack();
for(let i=0;i<simpl.length;i++){
    if(!isNaN(+simpl[i])||simpl[i]=='.'||((simpl[i]=='+'||simpl[i]=='-')&&((i!=simpl.length-1)&&!isNaN(simpl[i+1])))){
    num+=simpl[i];
    continue;
    
}
else if (simpl[i]==','){
       
       if(num!=''){
        stack.push(num);
        num='';}
        continue
    }
    else if (simpl[i]=='+'||simpl[i]=='-'||simpl[i]=='*'||simpl[i]=='/'){
        let secnum=parseFloat(stack.topf());
        stack.pop();
        let firnum=parseFloat(stack.topf());
        stack.pop();
        let total;
        switch(simpl[i]){
            case '+': 
            total=firnum+secnum;
            break;
            case '-':
            total=firnum-secnum;
            break;  
            case'*':
            total=firnum*secnum;
            break;
            case'/':
            total= firnum/secnum;
            break;


        }
        stack.push(total);

    }



}
return stack.topf();

}

let myh=document.createElement('h5')
myh.innerText='By: Ahmed Omar';
document.body.append(myh)
