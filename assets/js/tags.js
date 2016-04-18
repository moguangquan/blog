/*标签的js */
/**
 * 分类展示
 * 点击左侧的标签展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function tagDisplay() {
    /*only show first tag*/
    var $first_tag_posts=$('.post-list-body').find('div:first');
    $first_tag_posts.nextAll().hide();
    //初始化第一个标签的隐藏文章
    $first_tag_posts.find("a.post-list-item").hide();//隐藏文章
    $first_tag_posts.find("a.post-list-item").slice(0,2).show();//显示文章
    /*show tag when click tag list*/
    $('.tag').click(function() {
        var cate = $(this).attr('cate'); //get tag's name
        var $cur_tag_posts=$(document.getElementsByName(cate)[0]);
        $('.post-list-body>div').hide(250);
        $cur_tag_posts.show(400);
        //隐藏该标签下的部分文章
        $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
        $cur_tag_posts.find("a.post-list-item").slice(0,2).show();//显示文章
    });
}
/**
*生成分页
*/
function generatePagi() {

    $("div.pagination .inline-list li a").on("click",function(){
        //清除所有的class为cur_page的a标签
        $("div.pagination a").removeClass("current-page");
        //给当前a标签添加class为cur_page
        $(this).addClass("current-page");
        var cur_page=$(this).attr("cur_page");//得到点击的页码
        //判断页码-1<=(可选的页数/2)
        if(cur_page-1>2){
            $("a.post-list-item").hide();//隐藏文章
            $("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show();//显示文章
            $("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().hide();//隐藏页码
            $("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().show();//显示页码
        }
        //判断页码-总页数>=(可选的页数/2)
        if(cur_page-1<2){
            $("a.post-list-item").hide();//隐藏文章
            $("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show();//显示文章
            $("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().hide();//隐藏页码
            $("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().show();//显示页码
        }
    });
    //前一页
    $("div.pagination strong.prev").on("click",function(){
    //获取当前的页码
        var cur_page=$(a.current-page).attr("cur_page");
        if(cur_page){
            var prev_page=cur_page-1;
            //清除所有的class为current-page的a标签
            $("div.pagination a").removeClass("current-page");
            //给前一个页码添加current-page样式
            $("a[cur_page='"+(prev_page)+"']").attrClass("current-page");
            $("a.post-list-item").hide();//隐藏文章
            $("a.post-list-item").slice((prev_page-1)*2,prev_page*2).show();//显示文章
        }
    });
    //后一页
    $("div.pagination strong.next").on("click",function(){
        //获取当前的页码
        var cur_page=$(a.current-page).attr("cur_page");
        if(cur_page){
            var next_page=cur_page+1;
            //清除所有的class为current-page的a标签
            $("div.pagination a").removeClass("current-page");
            //给前一个页码添加current-page样式
            $("a[cur_page='"+(next_page)+"']").attrClass("current-page");
            $("a.post-list-item").hide();//隐藏文章
            $("a.post-list-item").slice((next_page+1)*2,next_page*2).show();//显示文章
        }
    });
}
// FitVids options
$(function() {
  tagDisplay();
  generatePagi();
});
