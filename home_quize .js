var code="";
function loads(id){

    var data= fetch("http://localhost:3000/ques")
    .then((data)=>{
        data.json()
        .then((dat)=>{
                //console.log(JSON.stringify(dat[0].Ques));
            if(dat.length>id+1)
            {
            code+=`<div id="s-no${id}" class="main">
            <div id="Qes">
                <div>
                <span id="s-no">${dat[id].se_no}.</span>
                </div>
            
                <div id="Qs_bg">
                <p id="Qs">${dat[id].Ques}</p>
                </div>
            </div>
                <div id="option">`;

             for(x of dat[id].options)
             {
                code+=`<input type="radio" name="ANS${id}" value="1"><label>${x}</label><br>`
             } 
              code+= ` </div>
                <div id="buttons"> 
                    <div><button id="prev" onclick="prev()"><i class="fa fa-arrow-left" aria-hidden="true"></i>Prev </button></div>
                    <div><button id="next" onclick="next()">next <i class="fa fa-arrow-right" aria-hidden="true"></i></button></div>
                </div>
            </div>`;
            document.getElementById('body').innerHTML=code;
             if(id!=0){
                 document.getElementById(`s-no${id-1}`).style.display="none";
             }
            // else{
            //     document.getElementById(`s-no${id+1}`).style.display="none";
            // }
            for(var x=1;x<=id;x++)
            {
                document.getElementById(`s-no${x-1}`).style.display="none";

            }
            bool=false;
            current=id;
            }
            else{
                /*code=`
                    <div id="end"> 
                        <button id="Submit">Submit</button>           
                    </div>`;*/
                    code+=`<div id="s-no${id}" class="main">
                    <div id="Qes">
                        <div>
                        <span id="s-no">${dat[id].se_no}.</span>
                        </div>
                    
                        <div id="Qs_bg">
                        <p id="Qs">${dat[id].Ques}</p>
                        </div>
                    </div>
                        <div id="option">`;

             for(x of dat[id].options)
             {
                code+=`<input type="radio" name="ANS${id}" value="1"><label>${x}</label><br>`
             } 
              code+= ` </div>
                <div id="buttons"> 
                    <div><button id="prev" onclick="prev()"><i class="fa fa-arrow-left" aria-hidden="true"></i>Prev </button></div>
                    <div><button id="Submit">Submit</button></div>
                </div>
            </div>`;
            document.getElementById('body').innerHTML=code;
            if(id!=0){
                document.getElementById(`s-no${id-1}`).style.display="none";
            }
            for(var x=1;x<=id-1;x++)
            {
                document.getElementById(`s-no${x-1}`).style.display="none";

            }
            bool=false;
            current=id;
            
            }
        })
    })    
   
}
var bool=false;
var pos=0;
var current=0;
function prev(){
   
    document.getElementById(`s-no${pos-1}`).style.display="block";
    document.getElementById(`s-no${pos}`).style.display="none";
    pos--;
    bool=true
    
}

function next(){
    
   // document.getElementById(`s-no${pos}`).style.display="none";
    
    if(pos>=current)
    {
        bool=false;
    } 
   if(bool)
    {   
        pos++;
        document.getElementById(`s-no${pos-1}`).style.display="none";
        document.getElementById(`s-no${pos}`).style.display="block"; 
    }   
    else
    {
        pos++;
        loads(pos);
    }

}