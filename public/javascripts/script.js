
var app = new Vue({
  el: '#app',
    data: {
    categories: [],
    categoryName: '',
    allotment: '',
    dataPoints: [],
  },
  colorPallette: [
    "#705451",
    "#C5817F",
    "#6181A7",
    "#73DCDD",
    ],
  created: function() {
  this.getCategories();
},
  methods: {
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