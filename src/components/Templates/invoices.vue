<template>
    <div>
       <div class="invoice-status success bold-span" :class="[data.status === 'overdue' ? 'danger' : 'success']">
            {{data.status === 'overdue' ? 'Overdue' : 'Draft'}}
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {}
        }
    }
 }
</script>