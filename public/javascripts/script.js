
var app = new Vue({
  el: '#app',
    data: {
    categories: [],
    categoryName: '',
    allotment: '',
    barWidth: '',
    max: 0,
    colorPallette: [
    "#705451",
    "#C5817F",
    "#6181A7",
    "#73DCDD",
    ],
    
  },
  
  created: function() {
  this.getCategories();
  this.makeChart();
  },
  computed: {
  	styles: function() {
  		var width = 200;
  		var max = this.getMax();
      var multiplier = 100/max;
  		return {
  			'background-color': 'blue',
  		// 	width: (2) + '%',
  		};
  	},
  	 
  },
  methods: {
    getMaxLength(){
      //function for determining how long the longest bar should be 
      //based on window width
      // TODO: make this refresh whenever the window size changes
      var windowWidth = window.innerWidth;
      var maxLength = windowWidth *.8;
      return maxLength;
    },
    getMax(){//function for finding the biggest allotment
      console.log("-------GET MAX FUNCTION-------");
  	  var max = Number(this.categories[0].allotment);
  	  console.log("FIRST ELEMENT: " + max); 
  	  for(let i = 0; i < this.categories.length; i++){
  	    console.log("COMPARING: " + max + " to: " + this.categories[i].allotment);
  	    
  	    if(Number(this.categories[i].allotment) > max){
  	      console.log(this.categories[i].allotment + " is greater than " + max);
  	      max = Number(this.categories[i].allotment);
  	    }
  	  }
  	  console.log("FINAL MAX: " + max);
  	  return max;
  	},
    getBarSize(elementSize){
      console.log("ELEMENT SIZE: " + elementSize);
      console.log("MAX: " + this.getMax());
      var multiplier = 80/this.getMax();
      console.log("MULTIPLIER: " + multiplier);
      return elementSize * multiplier;
      
    
    },
    makeChart(){
      console.log("Making the chart!!");
      var chart = document.getElementById("graph-box");
      chart.innerHTML = '';
      var category;
      
      var barColor;
      var barWidth;
      
      console.log("approaching for loop");
      console.log("SIZE: " + this.categories.length);
      
      for(let i = 0; i < this.categories.length; i++){
        category = this.categories[i];
        var bar = document.createElement("div");
        var rulerSpan = document.createElement("span");
        var label = document.createElement("p");
        
        var labelText = category.categoryName + " --- $" + category.allotment;
        label.innerHTML = labelText;
        
        bar.setAttribute('class', 'bar');
        bar.setAttribute('id', i);
        
        
        
        chart.appendChild(bar);
        rulerSpan.appendChild(label);
        barWidth = this.getBarSize(category.allotment);
        console.log("Bar width: " + barWidth);
        barColor = this.colorPallette[i%(this.colorPallette.length)];
        console.log("Bar Color: " + barColor);
        document.getElementById(i).style.width = barWidth +"%";
        
        console.log("LABEL WIDTH: " + rulerSpan.clientWidth);
        //TODO: make getting the width of the label work. right now it is 0
        console.log("BAR WIDTH: " + bar.clientWidth);
        if(rulerSpan.clientWidth < bar.clientWidth){
          console.log("APPENDING");  
          
          bar.appendChild(rulerSpan);
        }

        document.getElementById(i).style.backgroundColor = barColor;
      }
      
    },
    openForm(formId) {
      document.getElementById(formId).style.display = "block";
    },
    closeForm(formId) {
      document.getElementById(formId).style.display = "none";
    },
    async addItem() {
      try {
        const response = await axios.post("/api/categories", {
          categoryName: this.categoryName,
          allotment: this.allotment
        });
        this.categoryName = "";
        this.allotment = "";
        this.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const response = await axios.delete("/api/categories/" + item.id);
        this.getCategories();
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    getBarWidth(number){
      number /= 2;
      this.barWidth = number +"px";
      return this.barWidth;
      
    },
    showAll() {
      this.show = 'all';
    },
    async getCategories() {
      try {
        const response = await axios.get("/api/categories");
        console.log("RESPONSE: " + response.data);
        this.categories = response.data;
        
      } catch (error) {
        console.log(error);
      }
    
       console.log("CATEGORIES: " + this.categories[0].allotment);
       this.makeChart();
     },
  }
});