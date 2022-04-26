import '@npkg/tinymce-plugins/upfile' 
import '@npkg/tinymce-plugins/attachment'
import Vue from 'vue'
Vue.component('tinymce', {
  props: ['value'],
  data() {
    return {
      flag: true
    }
  },
  watch: {
    value(val) {
      if (this.flag) {
        tinyMCE.activeEditor.setContent(val);
      }
      this.flag = true;
    }
  },
  mounted: function () {
    var component = this;
    tinymce.init({
      target: this.$el.children[0],
      setup: function (editor) {
        editor.on('input undo redo execCommand', function (e) {
          component.flag = false;
          component.$emit('input', editor.getContent());
        })
      },
      inline: false,
      language_url: "/static/js/tinymce/js/tinymce/langs/zh_CN.js",
      language: "zh_CN",
      skin_url: "/static/js/tinymce/js/tinymce/skins/ui/oxide-dark",
      extended_valid_elements: "a[class|target|href|onclick],div[class|onclick|id|style],link[rel|href]",
      attachment_max_size: 209715200,
      attachment_style: '.attachment>img{display:inline-block!important;max-width:30px!important;}',
      attachment_icons_path: 'https://unpkg.com/@npkg/tinymce-plugins/plugins/attachment/icons',
      attachment_upload_handler: function (file, succFun, failFun, progressCallback) {
        component.$emit('attachment_upload_handler', file, succFun, failFun, progressCallback);
      },
      file_callback: function (file, succFun) {
        //  上传逻辑
        succFun(this.uploadUrl, {
          text: 'xx.pdf'
        }) //成功回调函数 text 显示的文本
      },
      height: 400, // 高度
      width: "100%",
      branding: false,
      plugins: "upfile table advlist autolink lists link  charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image attachment",
      toolbar: ["undo redo removeformat | cut copy paste pastetext | fontselect fontsizeselect | upfile table image attachment | searchreplace code preview fullscreen",
        " bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify styleselect | bullist numlist subscript superscript"],
      menubar: false,
      fontsize_formats: "12px 14px 18px 24px 36px",
      font_formats:"微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
      paste_data_images: true,
      images_file_types: "jpeg,jpg,png,gif,bmp,webp",
      images_upload_handler: (blobInfo, success, failure) => {
        let formData = new FormData();
        formData.append("file", blobInfo.blob());
        if (blobInfo.blob().size / 1024 / 1024 > 50) {
          failure("上传失败，图片大小请控制在 50M 以内");
          return;
        }
        respons.post(this.uploadUrl, formData).then((res) => {
          if (res.status === 200) {
            success(res.data.downloadUrl);
          } else {
            failure("图片上传失败,联系开发人员");
          }
        });
      },
    });
  },
  template: `<div style="width: 100%"><textarea style="width: 100%" v-model="value"></textarea></div>`
});
