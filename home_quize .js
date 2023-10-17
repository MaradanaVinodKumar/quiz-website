var code="";

var  time=0;
var s=60;
var m;
var sec;

function loads(){
    times_bool=true;
    var data= fetch("http://localhost:3000/ques")
    .then((data)=>{
        data.json()
        .then((dat)=>{
                //console.log(JSON.stringify(dat[0].Ques));
            for(var id=0;id<dat.length;id++)
            {
            
            if(dat.length>id+1)
            {
            code+=`<div id="s-no${id}" class="main anim">
            <div id="Qes">
                <div>
                <span id="s-no">${dat[id].se_no}.</span>
                </div>
            
                <div id="Qs_bg">
                <p id="Qs">${dat[id].Ques}</p>
                </div>
            </div>
                <div id="option">`;
                i=1;
             for(var x of dat[id].options)
             {
                code+=`<input type="radio" name="ANS${id}" value="${i}"><label>${x}</label><br>`
                i++;
             } 
              code+= ` </div>
                <div id="buttons"> 
                    <div><button id="prev" onclick="prev()"><i class="fa fa-arrow-left" aria-hidden="true"></i> Prev </button></div>
                    <div><button id="next" onclick="next()"> next <i class="fa fa-arrow-right" aria-hidden="true"></i></button></div>
                </div>
            </div>`;
            //document.getElementById('body').innerHTML=code;
            //  if(id!=0){
            //      document.getElementById(`s-no${id-1}`).style.display="none";
            //  }
            // else{
            //     document.getElementById(`s-no${id+1}`).style.display="none";
            // }

            // for(var x=1;x<=id;x++)
            // {
            //     document.getElementById(`s-no${x-1}`).style.display="none";

            // }
           // bool=false;
           // current=id;
            }
            else{
                /*code=`
                    <div id="end"> 
                        <button id="Submit">Submit</button>           
                    </div>`;*/
                    code+=`<div id="s-no${id}" class="main anim">
                    <div id="Qes">
                        <div>
                        <span id="s-no">${dat[id].se_no}.</span>
                        </div>
                    
                        <div id="Qs_bg">
                        <p id="Qs">${dat[id].Ques}</p>
                        </div>
                    </div>
                        <div id="option">`;
                var i=1
             for(x of dat[id].options)
             {
                code+=`<input type="radio" name="ANS${id}" value="${i}"><label>${x}</label><br>`
                i++;
             } 
              code+= ` </div>
                <div id="buttons"> 
                    <div><button id="prev" onclick="prev()"><i class="fa fa-arrow-left" aria-hidden="true"></i> Prev </button></div>
                    <div><button id="Submit" onclick="Submit()">Submit</button></div>
                </div>
            </div>`;
            document.getElementById('body').innerHTML=code;
             if(id!=0){
                 document.getElementById(`s-no${id-1}`).style.display="none";
             }
             for(var x=1;x<=id+1;x++)
             {
                 document.getElementById(`s-no${x-1}`).style.display="none";
             }
            
            bool=false;
            current=id;
            //pos=id;
             
            document.getElementById(`s-no0`).style.display="block";
            pos=0;
            time=Math.ceil(current/2);
            // time=0;
             m=setInterval(()=>{time--;s=60; if(time<0){document.getElementById('time-count').innerText='00:00';Submit(false);alert('Time out!');clearInterval(m)}},60000);
             sec=setInterval(()=>{
               s--;
               
               document.getElementById('time-count').innerText=(time=(time.toString()).length=='1'?"0"+time:time)+":"+(s=(s.toString()).length=='1'?"0"+s:s);
               if(time<0){document.getElementById('time-count').innerText='00:00';clearInterval(sec);}
            },1000)
            
            }
        }
        
        })
    })    
    
       
   
}
var bool=false;
var pos=0;
var current=0;
function prev(){
   if(pos!=0)
   {
    document.getElementById(`s-no${pos-1}`).style.display="block";
    document.getElementById(`s-no${pos}`).style.display="none";
    pos--;
    //bool=true
   }
    
}

function next(){
    
   // document.getElementById(`s-no${pos}`).style.display="none";
    
    // if()
    // {
    //     bool=false;
    // } 
   if(pos<=current)
    {   
        
        document.getElementById(`s-no${pos}`).style.display="none";
        document.getElementById(`s-no${pos+1}`).style.display="block"; 
        pos++;
    }   
    // else
    // {
    //     pos++;
    //     //loads(pos);
    // }

}


function Submit(sub_bool=true){
    if(sub_bool)
    {
      var conform=confirm("do you want to submit!");
      
    }
    else{
        conform=true;
    }
    
    if(conform)
    {
    var arr=[];
    var bool=false;
    for(x=0;x<=current;x++){
        var radio=document.getElementsByName(`ANS${x}`);
        bool=true;
        for(y of radio)
        {
            if(y.checked)
            {
                arr.push(y.value);
               bool=false; 
            }
            
        }
        if(bool)
        {
            arr.push(0);
        }
    }
    console.log(arr)
    
    fetch("http://localhost:3000/ques")
    .then((data)=>{
        data.json()
        .then((data)=>{
            var count=0;
            i=0;
            for(x of data)
            {
                if(x.Ans==arr[i])
                {
                    count++;
                }
                i++;
            }
            console.log(count);

            document.getElementById('body').innerHTML=`    <div id="score">
            <div id="scr">
            -------- Score --------
            </div>
            <div id="cor">
             Correct Answers : <label for="currect">${count} </label>
            </div>
            <div id="wron">
                 Wrong Answers : <label for="wrong">${count}</label>
            </div>
            <div id="tot">
             Total Quotation : <label for="total">${current+1}</label>
             </div>
                   
             <div id="per">
                 Percentage : <label for="pers">${(count/(current+1)*100).toFixed(1)}%</label>
             </div>
         </div>`;
         clearInterval(sec);
         clearInterval(m);
         document.getElementById('time-count').innerText='00:00';
        })
    })
    }
   
}

