---
extend: '@vue/cli-service/generator/template/src/App.vue'
replace:
  - !!js/regexp /Welcome to Your Vue\.js App/
  - !!js/regexp /<script>[^]*?<\/script>/
---


<%# REPLACE %>
Replace Welcome Message
<%# END_REPLACE %>

<%# REPLACE %>
<script>
  export default {
    console.log('绿色付款');
  }
</script>
<%# END_REPLACE %>