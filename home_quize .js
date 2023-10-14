var code="";
function loads(id){

    var data= fetch("http://localhost:3000/ques")
    .then((data)=>{
        data.json()
        .then((dat)=>{
                //console.log(JSON.stringify(dat[0].Ques));
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
        })
    })    
   
}
var pos=0;
function prev(){
   
    document.getElementById(`s-no${pos-1}`).style.display="block";
   // document.getElementById(`s-no${pos+1}`).style.display="block";
    pos--;
    
}

function next(){
    
    //document.getElementById(`s-no${pos}`).style.display="none";
    pos++;
    loads(pos);

}