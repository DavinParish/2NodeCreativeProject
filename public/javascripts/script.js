
var app = new Vue({
  el: '#app',
    data: {
    categories: [],
    categoryName: '',
    allotment: '',
    barWidth: '',
    colorPallette: [
    "#705451",
    "#C5817F",
    "#6181A7",
    "#73DCDD",
    ],
    
  },
  
  created: function() {
  this.getCategories();
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
    getMax(){
  	  var max = this.categories[0].allotment;
  	  for(let i = 0; i < this.categories.size; i++){
  	    console.log(this.categories[i].allotment);
  	    if(this.categories[i].allotment > max){
  	      max = this.categories[i].allotment;
  	    }
  	  }
  	},
    getBarSize(){
      return "50px";
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
        this.categories = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
});