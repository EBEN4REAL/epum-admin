<template>
    <div>
       <div class="invoice-status success bold-span" :class="[data.status === 'OverDue' ? 'danger' : data.status === 'Paid' ? 'success' : 'danger']">
            {{data.status}}
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