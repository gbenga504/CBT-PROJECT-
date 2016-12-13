var subject= ["Mathematics","English"],
size= size|| 5,
sub_no=0,//this holds value for maths
indes= 0,//this hold the index 
sec = 59,
min = 19,
subjects = {};
sizeChanger(5);
updateSubject();
var stored= ansStore();//should be called after organise() and updateSubject() function

//organise function


//set timer function 
	  function time()
	  {
	  document.getElementById("txtbox2").value = min;
	  sec -= 1;
	  document.getElementById("txtbox3").value = sec;
	   
	  
	
	  /* if (min == 1) {
	   hour += 1;
	   document.getElementById("txtbox1").value = hour;
	   min = 0;
	   } */
	   
	   if (sec <= 9 && min == 0) 
	   {
		 document.getElementById("txtbox3").style.color = "red";  
	   }
	   
	   if(min == 0 && sec == 0){
		   clearInterval("time()");
		   var a = arrange();
		   finalScore(a);
			location.href = "result.html"
	   }
	   if (sec == 0 ) {
	   min -= 1;
	   sec = 59;
	   }
	  }
	    
	  
	   

 setInterval("time();" , 1000);



function organise(data){
	//loop the amount of times we av a subject
	for(var ii =0; ii < subject.length; ii++){
		subjects[subject[ii]] = [];
		var something = subjects[subject[ii]],
		store= [];
		while(something.length < size){
			//
			var rand= randomly(data[subject[ii]].length);
			if(store.indexOf(rand)!==-1){
				//if stored in store move on
				continue;
			}
			//push the data to the something Array
			
			something.push(data[subject[ii]][rand]);
			store.push(rand);
			
		}
	}
	//this is a custom event that fires when the organise function is 2ru
	var fired= new Event("fired");
	document.dispatchEvent(fired);
}
//randomizer to randomize the length given to it
function randomly(length){
	var random= Math.floor(Math.random()* (length));
	return random;
}

//this changesbthe value ofbthe size
function sizeChanger(new_size){
	size= new_size;
	return size;
}

//post function controls the DOM manipulatzn

function post(indes){
	var question = subjects[subject[sub_no]][indes];
	$("p.question").html(question.quest);
	$("input#ans").each(function(i){
		document.querySelectorAll("input#ans")[i].checked=false;
	});
	$("input#ans").each(function(index){
		if(index==stored[subject[sub_no]][indes].cbox){
			document.querySelectorAll("input#ans")[index].checked= true;
		}
		$(this).attr("value",question.ans[index].correct);
		$(this).next("span").html(question.ans[index].answers);
		
	});
}
organise(obj);
post(0);

//remember to move up before post is called
//this update the subject with new data it should be called first
function updateSubject(){
	var arr= [];
	arr[0]= sessionStorage.getItem("sub1");
	arr[1] = sessionStorage.getItem("sub2");
	for(var ii=0; ii< arr.length; ii++){
		subject.push(arr[ii]);
	}
}

console.log(subject);
//this manipulatez the question tab
function questPost(){
	var btn= "#questionPage button#tab";
	$(btn).each(function(index){
		$(this).html(subject[index]);
	});
	$(btn).click(function(){
		var that= $(this);
		indes=0;
		$(this).each(function(){
			console.log(that.index());
			sub_no=  that.index();
		}
		);
		post(0);
	});
	
}

//move to the next question
function next(){
	if(indes==(size-1)){
		
		if(sub_no==(subject.length-1)){
			sub_no=0;
			
		}
		else{
			sub_no++;
		}
		indes=0;
	}
	else{
		indes++;
	}
	post(indes);
}
//this move backward
function previous(){
	if(indes==0){
		
		if(sub_no==0){
			sub_no=(subject.length-1);
			
		}
		else{
			sub_no--;
		}
		indes=(size-1);
	}
	else{
		indes--;
	}
	post(indes);
}
questPost();

$("#next").click(function(){
	next();
	
});
$("#previous").click(function(){
	previous();
	
});
var subjectName =function(){
	return subject[sub_no];
	
};
//
function ansStore(){
	var stored= [];
	for(var i=0; i<subject.length; i++){
		stored[subject[i]]= [];
		var hold= stored[subject[i]];
		for(var j=0; j< size;j++){
			hold[j]= {
				correct:1,
				cbox:-1
			};
		}
	}

	return stored;
}
//this sets the value when 
//input#ans is clicked
function setAns(index,stored,obj,t){
	var s= t.index()/3;
	console.log(s);
	stored[subjectName()][index]= {
		correct: obj[subjectName()][index].ans[s].correct,
		cbox: s
	};
	console.log(stored[subjectName()][index].correct);
}
//this hold the value for the ans
$("input#ans").each(function(){
	$(this).click(function(){
		var that = $(this);
		setAns(indes,stored,subjects,that);
	});
});

$("button#num").each(function(){
	
	var that= $(this);
	$(this).click(function(){
		
		indes = that.index();
		post(indes);
	});
});
function arrange(){
	var correctness= [];
	for(var ii=0; ii<subject.length;ii++){
		var hold = stored[subject[ii]];
		for(var jj=0; jj<size; jj++){
			correctness.push(hold[jj].correct);
		}
	}
	return correctness;
}
function finalScore(arr){
	var final= size*subject.length, 
	count= 0;
	for(var i=0; i<final;i++){
		if(arr[i]%7 ===0){
			count++;
		}
	}
	var percent= (count/final)*100;
	sessionStorage.setItem("score", percent +"%");
	return percent + "% "+size;
	
}
function showEachScore(obj){
	var length= size * subject.length,
	count= 0;
	for(var i=0; i<length;i++){
		if(obj[i]%7===0){
			count++;
		}
		if((i+1)%size===0){
			var percent= (count/size)* 100;
			count=0;
			sessionStorage.setItem(subject[(i+1)/5],percent+"%");
		}
	}
}

$("#submit").click(function(){
	var a=arrange();
	finalScore(a);
	location.href = "result.html";
});
function colorBox(){
	$("button#num").each(function(inde){
		//alert(inde);
		var th =  $(this);
		replaceColor(th, "#ff0000");
		if (stored[subjectName()][inde].correct !=1){
			replaceColor(th,"#0000ff")
		}
	});
	// loop through the index of the box 
	// check if the array

}
function replaceColor(elem, color){
	elem.css({backgroundColor: color});
}
$("button").each(function (){
	$(this).click(function(){
		colorBox();
	});
});
