<template>
    <div class="paginator__wrapper">
      <ul class="pagination py-5">
          <li 
          class="pagination-item"
          >
          <button 
              type="button" 
              @click="onClickFirstPage"
              :disabled="isInFirstPage"
              aria-label="Go to first page"
          >
              First
          </button>
          </li>

          <li
          class="pagination-item"
          >
          <button 
              type="button" 
              @click="onClickPreviousPage"
              :disabled="isInFirstPage"
              aria-label="Go to previous page"
          >
              <i class="fa fa-angle-left" aria-hidden="true"></i>
          </button>
          </li>

          <li v-for="(page,i) in pages" class="pagination-item" :key="i">
          <button 
              type="button" 
              @click="onClickPage(page.name)"
              :disabled="page.isDisabled"
              :class="{ active: isPageActive(page.name) }"
              :aria-label="`Go to page number ${page.name}`"
              
          >
              {{ page.name }}
          </button>
          </li>

          <li class="pagination-item">
          <button 
              @click="onClickNextPage"
              :disabled="isInLastPage"
              aria-label="Go to next page"
          >
              <i class="fa fa-angle-right" aria-hidden="true"></i>
          </button>
          </li>

          <li class="pagination-item">
          <button 
              type="button" 
              @click="onClickLastPage"
              :disabled="isInLastPage"
              aria-label="Go to last page"
          >
              Last
          </button>
          </li>
          <li>
            <div class=" paginator_dropdown" >
                <select v-model="pageSize" @change="getPageSize">
                    <option value="Items Per Page" disabled >Items Per Page</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
            </div>
          </li>
      </ul>
    </div>
</template>
<script>
export default {
    name: "Paginator",
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
      },
      totalPages: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
    },
    data() {
        return {
          pageSize: 10
        }
    },
computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if ((this.currentPage === this.totalPages) && this.currentPage !== 2) { 
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;

    },
    endPage() {
      
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    getPageSize(e) {
      this.$emit('getPageSize' , e.target.value)
    },
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);    
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
}
</script>