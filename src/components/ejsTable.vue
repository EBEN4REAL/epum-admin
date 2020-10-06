<template>
    <ejs-grid
        ref="dataGrid"
        :created="refreshGrid"
        :allowPaging="true"
        :allowSorting="true"
        :pageSettings="tableProps.pageSettings"
        :toolbar="tableProps.toolbar"
        :searchSettings="tableProps.search"
        :allowExcelExport="true"
        :allowPdfExport="true"
        :toolbarClick="toolbarClick"
        :dataSource="tableProps.tableData" 
        :columns="tableProps.columns"
        >
        <!-- <e-columns>
            <e-column field="Eben"   :headerText="colHeader.name" v-for="(colHeader,i) in  tableProps.tableHeaders" :key="i"></e-column>
        </e-columns> -->
    </ejs-grid>
</template>

<script>
import {Page,Sort,Toolbar,Search,ExcelExport,PdfExport} from "@syncfusion/ej2-vue-grids";
import Jquery from 'jquery';
let $ = Jquery;

export default {
  name: 'ejsTable',
  props: ['tableProps'],
  provide: {
    grid: [Page, Sort, Toolbar, Search, ExcelExport, PdfExport]
  },
  data() {
    return {

    }
  },
   mounted() {
    $(".e-input").keyup(function(e) {
      searchFun(e);
    });
    function searchFun(event) {
      var grid = document.getElementsByClassName("e-grid")[0].ej2_instances[0];
      var value = event.target.value;
      grid.search(value);
    }
    document.querySelector(".e-toolbar-center").classList.remove('e-headercontent')
    // document.querySelector(".e-spinner-pane").classList.remove('e-spinner-pane')
    
  },
  components: {

  },
  methods: {
    refreshGrid() {
      this.$refs.dataGrid.refresh();
    },
    toolbarClick(args) {
      switch (args.item.text) {
        case "PDF Export":
          let pdfExportProperties = {
            pageOrientation: 'Landscape',
            fileName: this.tableProps.fileName
          }
          this.$refs.dataGrid.pdfExport();
          break;
        case "Excel Export":
          this.$refs.dataGrid.excelExport();
          break;
      }
    },
  }
}
</script>

