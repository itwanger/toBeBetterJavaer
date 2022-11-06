import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as d,o as a,c,a as e,b as i,e as r,d as s}from"./app.85cbe1c4.js";const t={},o=r(`<p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u7A0B\u5E8F\u6C6A</p><p>\u7A0B\u5E8F\u5458\u7F16\u7801\u65F6\u4E00\u4E9B\u4E0D\u7ECF\u610F\u7684\u7EC6\u8282\u53EF\u80FD\u5BFC\u81F4\u4E00\u4E9B\u5F88\u96BE\u5BDF\u89C9\u7684BUG\uFF0C\u4E0A\u751F\u4EA7\u8FD0\u884C\u4E00\u6BB5\u65F6\u95F4\u540E\u624D\u53D1\u73B0\uFF0C\u771F\u7684\u5F88\u5934\u75BC\u3002</p><p>\u5728\u300A\u963F\u91CC\u5DF4\u5DF4Java\u5F00\u53D1\u624B\u518C\u300B\u4E2D\uFF0C\u5BF9\u4E8EPOJO\u4E2D\u5982\u4F55\u9009\u62E9\u53D8\u91CF\u7684\u7C7B\u578B\u4EE5\u53CA RPC \u63A5\u53E3\u4E2D\u7684\u8FD4\u56DE\u503C\u7C7B\u578B\u4E5F\u6709\u7740\u4E00\u4E9B\u89C4\u5B9A\uFF1A</p><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/6fuT3emWI5IibzibgbpjKvoJTZebia3RKDOd3L0BMFtTBSsDmcbUPh8VAlQh2icxdcqbMybEhnNoGS24SNLUWBx71Q/640?wx_fmt=jpeg" alt=""></p><p>\u8FD9\u91CC\u5F3A\u5236\u8981\u6C42\u4F7F\u7528\u5305\u88C5\u7C7B\u578B\uFF0C\u539F\u56E0\u662F\u4EC0\u4E48\u5462\uFF1F</p><p>\u6211\u4EEC\u6765\u770B\u4E00\u6BB5\u7B80\u5355\u7684\u4EE3\u7801</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**  

 * @author Hollis  

 */  

public class BooleanMainTest {  

  

    public static void main(String[] args) {  

        Model model1 = new Model();  

        System.out.println(&quot;default model : &quot; + model1);  

    }  

}  

  

class Model {  

    /**  

     * \u5B9A\u4E00\u4E2ABoolean\u7C7B\u578B\u7684success\u6210\u5458\u53D8\u91CF  

     */  

    private Boolean success;  

    /**  

     * \u5B9A\u4E00\u4E2Aboolean\u7C7B\u578B\u7684failure\u6210\u5458\u53D8\u91CF  

     */  

    private boolean failure;  

  

    /**  

     * \u8986\u76D6toString\u65B9\u6CD5\uFF0C\u4F7F\u7528Java 8 \u7684StringJoiner  

     */  

    @Override  

    public String toString() {  

        return new StringJoiner(&quot;, &quot;, Model.class.getSimpleName() + &quot;[&quot;, &quot;]&quot;)  

                .add(&quot;success=&quot; + success)  

                .add(&quot;failure=&quot; + failure)  

                .toString();  

    }  

}  

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5\u4E0A\u4EE3\u7801\u8F93\u51FA\u7ED3\u679C\u4E3A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>default model : Model[success=null, failure=false]  

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u5F53\u6211\u4EEC\u6CA1\u6709\u8BBE\u7F6EModel\u5BF9\u8C61\u7684\u5B57\u6BB5\u7684\u503C\u7684\u65F6\u5019\uFF0CBoolean\u7C7B\u578B\u7684\u53D8\u91CF\u4F1A\u8BBE\u7F6E\u9ED8\u8BA4\u503C\u4E3Anull\uFF0C\u800Cboolean\u7C7B\u578B\u7684\u53D8\u91CF\u4F1A\u8BBE\u7F6E\u9ED8\u8BA4\u503C\u4E3Afalse\u3002</p><p><strong>\u5373Boolean\u5BF9\u8C61\u7684\u9ED8\u8BA4\u503C\u662F</strong><code>null</code>\uFF0C<strong>boolean\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C\u662F</strong><code>false</code>\u3002</p><p>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5305\u88C5\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C\u90FD\u662Fnull\uFF0C\u800C\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u9ED8\u8BA4\u503C\u662F\u4E00\u4E2A\u56FA\u5B9A\u503C\uFF0C\u5982boolean\u662Ffalse\uFF0Cbyte\u3001short\u3001int\u3001long\u662F0\uFF0Cfloat\u662F0.0f\u7B49\uFF1B</p><p>\u6211\u4EEC\u518D\u4E3E\u4E00\u4E2A\u6263\u8D39\u7684\u4F8B\u5B50\uFF0C\u6211\u4EEC\u505A\u4E00\u4E2A\u6263\u8D39\u7CFB\u7EDF\uFF0C\u6263\u8D39\u65F6\u9700\u8981\u4ECE\u5916\u90E8\u7684\u5B9A\u4EF7\u7CFB\u7EDF\u4E2D\u901A\u8FC7 RPC \u8BF7\u6C42\u8BFB\u53D6\u4E00\u4E2A\u8D39\u7387\u7684\u503C\uFF0C\u6211\u4EEC\u9884\u671F\u8BE5\u63A5\u53E3\u7684\u8FD4\u56DE\u503C\u4E2D\u4F1A\u5305\u542B\u4E00\u4E2A\u6D6E\u70B9\u578B\u7684\u8D39\u7387\u5B57\u6BB5\u3002\u5F53\u6211\u4EEC\u53D6\u5230\u8FD9\u4E2A\u503C\u5F97\u65F6\u5019\u5C31\u4F7F\u7528\u516C\u5F0F\uFF1A\u91D1\u989D*\u8D39\u7387=\u8D39\u7528 \u8FDB\u884C\u8BA1\u7B97\uFF0C\u8BA1\u7B97\u7ED3\u679C\u8FDB\u884C\u5212\u6263\u3002</p><p>\u5982\u679C\u7531\u4E8E\u8BA1\u8D39\u7CFB\u7EDF\u5F02\u5E38\uFF0C\u4ED6\u53EF\u80FD\u4F1A\u8FD4\u56DE\u4E2A\u9ED8\u8BA4\u503C\uFF0C\u5982\u679C\u8FD9\u4E2A\u5B57\u6BB5\u662FDouble\u7C7B\u578B\u7684\u8BDD\uFF0C\u8BE5\u9ED8\u8BA4\u503C\u4E3Anull\uFF0C\u5982\u679C\u8BE5\u5B57\u6BB5\u662Fdouble\u7C7B\u578B\u7684\u8BDD\uFF0C\u8BE5\u9ED8\u8BA4\u503C\u4E3A0.0\u3002</p><p>\u5982\u679C\u6263\u8D39\u7CFB\u7EDF\u5BF9\u4E8E\u8BE5\u8D39\u7387\u8FD4\u56DE\u503C\u6CA1\u505A\u7279\u6B8A\u5904\u7406\u7684\u8BDD\uFF0C\u62FF\u5230null\u503C\u8FDB\u884C\u8BA1\u7B97\u4F1A\u76F4\u63A5\u62A5\u9519\uFF0C\u963B\u65AD\u7A0B\u5E8F\u3002\u62FF\u52300.0\u53EF\u80FD\u5C31\u76F4\u63A5\u8FDB\u884C\u8BA1\u7B97\uFF0C\u5F97\u51FA\u63A5\u53E3\u4E3A0\u540E\u8FDB\u884C\u6263\u8D39\u4E86\u3002\u8FD9\u79CD\u5F02\u5E38\u60C5\u51B5\u5C31\u65E0\u6CD5\u88AB\u611F\u77E5\u3002</p><p>\u6709\u4EBA\u8BF4\uFF0C\u90A3\u6211\u53EF\u4EE5\u5BF90.0\u505A\u7279\u6B8A\u5224\u65AD\uFF0C\u5982\u679C\u662F0\u4E00\u6837\u53EF\u4EE5\u963B\u65AD\u62A5\u9519\u554A\u3002\u4F46\u662F\uFF0C\u8FD9\u65F6\u5019\u5C31\u4F1A\u4EA7\u751F\u4E00\u4E2A\u95EE\u9898\uFF0C\u5982\u679C\u5141\u8BB8\u8D39\u7387\u662F0\u7684\u573A\u666F\u53C8\u600E\u4E48\u5904\u7406\u5462\uFF1F</p><p><strong>\u6240\u4EE5\uFF0C\u4F7F\u7528\u57FA\u672C\u6570\u636E\u7C7B\u578B\u53EA\u4F1A\u8BA9\u65B9\u6848\u8D8A\u6765\u8D8A\u590D\u6742\uFF0C\u5751\u8D8A\u6765\u8D8A\u591A\u3002</strong></p><p>\u8FD9\u79CD\u4F7F\u7528\u5305\u88C5\u7C7B\u578B\u5B9A\u4E49\u53D8\u91CF\u7684\u65B9\u5F0F\uFF0C\u901A\u8FC7\u5F02\u5E38\u6765\u963B\u65AD\u7A0B\u5E8F\uFF0C\u8FDB\u800C\u53EF\u4EE5\u88AB\u8BC6\u522B\u5230\u8FD9\u79CD\u7EBF\u4E0A\u95EE\u9898\u3002\u5982\u679C\u4F7F\u7528\u57FA\u672C\u6570\u636E\u7C7B\u578B\u7684\u8BDD\uFF0C\u7CFB\u7EDF\u53EF\u80FD\u4E0D\u4F1A\u62A5\u9519\uFF0C\u8FDB\u800C\u8BA4\u4E3A\u65E0\u5F02\u5E38\u3002</p><p>\u5F53\u7136\uFF0C\u4EE5\u4E0A\u7684\u9009\u62E9\u662F\u9488\u5BF9\u4E00\u4E9B\u7535\u5546\u3001\u652F\u4ED8\u3001\u91D1\u878D\u7B49\u573A\u666F\uFF0C\u53EF\u4EE5\u727A\u7272\u6682\u65F6\u7684\u53EF\u7528\u6027\u7684\u573A\u666F\uFF0C\u5982\u679C\u662F\u5BF9\u4E8E\u67D0\u4E9B\u8F6F\u4EF6\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u5BB9\u5FCD\u6570\u636E\u4E0D\u51C6\uFF0C\u4F46\u662F\u4E0D\u80FD\u7CFB\u7EDF\u4E0D\u53EF\u7528\u7684\u60C5\u51B5\u8981\u53E6\u5F53\u522B\u8BBA\u3002</p><p><strong>\u4EE5\u4E0A\uFF0C\u5C31\u662F\u8981\u6C42\u5728POJO\u548CRPC\u7684\u8FD4\u56DE\u503C\u4E2D\u4F7F\u7528\u5305\u88C5\u7C7B\u578B\u7684\u539F\u56E0\u3002</strong></p><h2 id="\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" aria-hidden="true">#</a> \u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5</h2>`,21),v={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247501524&idx=1&sn=2cb28e7b64ab77c55bcc1a172b82a2ad&chksm=903bc2b9a74c4baf5737cd430560ee3c5a357bb37864257a05a72e3cccf41db5bd221ccc63d8&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b=s("\u7A0B\u5E8F\u6C6A\u63A5\u76847\u4E2A\u79C1\u6D3B\u90FD\u5728\u8FD9\u91CC\uFF0C\u7ECF\u9A8C\u6574\u7406"),u={href:"http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247488419&idx=2&sn=0b80c7f9f73fca89b91e257a269cfada&chksm=ceabf4ebf9dc7dfdaa605a9bb92d31c9fc0a10a7a94351234181a89ba5800672c6e7da2ebfbe&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},m=e("strong",null,"Java\u9879\u76EE\u5206\u4EAB \xA0\u6700\u65B0\u6574\u7406\u5168\u96C6\uFF0C\u627E\u9879\u76EE\u4E0D\u7D2F\u5566 07\u7248",-1),p={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247494170&idx=1&sn=5181a5277946be31478b1b9425c93f63&chksm=903bee77a74c67614b2772248e8b5e912d323bfe42a0e576dd157a4752f5fed88d6b439ec52f&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},f=s("\u582A\u79F0\u795E\u7EA7\u7684Spring Boot\u624B\u518C\uFF0C\u4ECE\u57FA\u7840\u5165\u95E8\u5230\u5B9E\u6218\u8FDB\u9636"),_={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247492941&idx=1&sn=2ff31fec735d7c5d6f3483c346d5ca69&chksm=903be120a74c68361fd9afad178e7338315041a2cd4459f2165a8faa20e995a3477af3eda2bb&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},h=e("strong",null,"\u5367\u69FD\uFF01\u5B57\u8282\u8DF3\u52A8\u300A\u7B97\u6CD5\u4E2D\u6587\u624B\u518C\u300B\u706B\u4E86\uFF0C\u5B8C\u6574\u7248 PDF \u5F00\u653E\u4E0B\u8F7D\uFF01",-1),g={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247496297&idx=2&sn=d253dda2160821262d9f6fc1a9a637d0&chksm=903bf604a74c7f126ab936e374a1f22b9b7cb26a7964b6cc837c3f73af516139064e522a1294&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"\u5367\u69FD\uFF01\u963F\u91CC\u5927\u4F6C\u603B\u7ED3\u7684\u300A\u56FE\u89E3Java\u300B\u706B\u4E86\uFF0C\u5B8C\u6574\u7248PDF\u5F00\u653E\u4E0B\u8F7D\uFF01",-1),z={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247490715&idx=2&sn=7f2c5de11bebaecfbaf1ce4b945a4d6f&chksm=903818f6a74f91e0fde557b75bd44adfd5d378612f682aa3eef6766927aebb9e5afc72c91a9e&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},q=e("strong",null,"\u5B57\u8282\u8DF3\u52A8\u603B\u7ED3\u7684\u8BBE\u8BA1\u6A21\u5F0F PDF \u706B\u4E86\uFF0C\u5B8C\u6574\u7248\u5F00\u653E\u4E0B\u8F7D\uFF01",-1),N=e("p",null,"\u6B22\u8FCE\u6DFB\u52A0\u7A0B\u5E8F\u6C6A\u4E2A\u4EBA\u5FAE\u4FE1 itwang009\xA0 \u8FDB\u7C89\u4E1D\u7FA4\u6216\u56F4\u89C2\u670B\u53CB\u5708",-1);function j(w,k){const n=d("ExternalLinkIcon");return a(),c("div",null,[o,e("p",null,[e("a",v,[b,i(n)])]),e("p",null,[e("a",u,[m,i(n)])]),e("p",null,[e("a",p,[f,i(n)])]),e("p",null,[e("a",_,[h,i(n)])]),e("p",null,[e("a",g,[x,i(n)])]),e("p",null,[e("a",z,[q,i(n)])]),N])}var B=l(t,[["render",j],["__file","weixin-xinllgjszjszzpojozsyjbsjlxyhjfyll.html.vue"]]);export{B as default};
