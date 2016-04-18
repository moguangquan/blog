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
        tag_reset();//复原操作
        //给当前a标签添加class为cur_page
        $(this).addClass("current-page");
        var cur_page=$(this).attr("cur_page");//得到点击的页码
        var $cur_tag_posts=$(this).closest("div.pagination");//得到当前的tag
        //判断页码-1<=(可选的页数/2)
        if(cur_page-1>2){
            $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show();//显示文章
            $cur_tag_posts.find("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().hide();//隐藏页码
            $cur_tag_posts.find("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().show();//显示页码
        }
        //判断页码-总页数>=(可选的页数/2)
        if(cur_page-1<2){
            $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show();//显示文章
            $cur_tag_posts.find("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().hide();//隐藏页码
            $cur_tag_posts.find("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().show();//显示页码
        }
    });
    //前一页
    $("div.pagination strong.prev").on("click",function(){
        var cur_page=$cur_tag_posts.find("a.current-page").attr("cur_page");//获取当前的页码
        tag_reset();//复原操作
        var $cur_tag_posts=$(this).closest("div.pagination");//得到当前的tag
        if(cur_page){
            var prev_page=cur_page-1;
            //给前一个页码添加current-page样式
            $cur_tag_posts.find("a[cur_page='"+(prev_page)+"']").attrClass("current-page");
            $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((prev_page-1)*2,prev_page*2).show();//显示文章
        }
    });
    //后一页
    $("div.pagination strong.next").on("click",function(){
        var cur_page=$cur_tag_posts.find("a.current-page").attr("cur_page");//获取当前的页码
        tag_reset();//复原操作
        var $cur_tag_posts=$(this).closest("div.pagination");//得到当前的tag
        if(cur_page){
            var next_page=cur_page+1;
            $cur_tag_posts.find("a[cur_page='"+(next_page)+"']").attrClass("current-page");//给前一个页码添加current-page样式
            $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((next_page+1)*2,next_page*2).show();//显示文章
        }
    });
}
/**
复原操作，在所有点击操作之前发生一次
*/
function tag_reset(){
//1.清除所有的class为cur_page的a标签
    $("div.pagination a").removeClass("current-page");
//2.隐藏所有文章
    $("a.post-list-item").hide();
}
// FitVids options
$(function() {
  tagDisplay();
  generatePagi();
});
