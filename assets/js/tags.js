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
    $first_tag_posts.nextAll().hide();//隐藏除第一个文章块下的文章
    //初始化第一个标签的隐藏文章
    $first_tag_posts.find("a.post-list-item").hide();//隐藏文章
    $first_tag_posts.find("a.post-list-item").slice(0,2).show();//显示文章
    //第一个标签下的页码
    var $first_tag_paginator=$first_tag_posts.find("div.pagination");
    if($first_tag_paginator){
        $first_tag_paginator.find("li:first").addClass("current-page");//给页码一添加current-page样式
    }
    /*show tag when click tag list*/
    $('.tag').click(function() {
        var cate = $(this).attr('cate'); //get tag's name
        var $cur_tag_posts=$(document.getElementsByName(cate)[0]);
        $('.post-list-body>div').hide(250);
        $cur_tag_posts.show(400);
        //隐藏该标签下的部分文章
        $cur_tag_posts.find("a.post-list-item").hide();//隐藏文章
        $cur_tag_posts.find("a.post-list-item").slice(0,2).show();//显示文章
         //第一个标签下的页码
        var $cur_tag_paginator=$cur_tag_posts.find("div.pagination");
        if($cur_tag_paginator){
         $cur_tag_paginator.find("a:first").addClass("current-page");//给页码一添加current-page样式
        }
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
        var $cur_tag_posts=$(this).closest("div.tag-posts");//得到当前的tag
        //判断页码-1<=(可选的页数/2)
        if(cur_page-1>2){
            $cur_tag_posts.find("a.post-list-item").hide(250);//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show(400);//显示文章
            //隐藏所有页码
            $cur_tag_posts.find("div.pagination").find("li").hide();
            //显示五个页码slice(cur_page-2-1,cur_page+2+1)
            $cur_tag_posts.find("div.pagination").find("li").slice(cur_page-2-1,cur_page+2).show();
            //$cur_tag_posts.find("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().hide();//隐藏页码
            //$cur_tag_posts.find("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().show();//显示页码
        }else{//判断页码-总页数>=(可选的页数/2)
            $cur_tag_posts.find("a.post-list-item").hide(250);//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((cur_page-1)*2,cur_page*2).show(400);//显示文章
           //隐藏所有页码
            $cur_tag_posts.find("div.pagination").find("li").hide();
           //显示五个页码slice(cur_page-2-1,cur_page+2+1)
            $cur_tag_posts.find("div.pagination").find("li").slice(0,cur_page+2).show();
           // $cur_tag_posts.find("a[cur_page='"+(cur_page+2)+"']").closest("li").nextAll().hide();//隐藏页码
           // $cur_tag_posts.find("a[cur_page='"+(cur_page-2)+"']").closest("li").prevAll().show();//显示页码
        }
    });
    //前一页
    $("div.pagination strong.prev").on("click",function(){
        var $cur_tag_posts=$(this).closest("div.tag-posts");//得到当前的tag
        var cur_page=$cur_tag_posts.find("a.current-page").attr("cur_page");//获取当前的页码
        var prev_page=cur_page-1;//获取前一页的页码
        if(prev_page>0){
            tag_reset();//复原操作
            //给前一个页码添加current-page样式
            $cur_tag_posts.find("a[cur_page='"+(prev_page)+"']").attrClass("current-page");
            $cur_tag_posts.find("a.post-list-item").hide(250);//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((prev_page-1)*2,prev_page*2).show(400);//显示文章
        }else{
           alert("第一页是最小的页码哦!");
        }
    });
    //后一页
    $("div.pagination strong.next").on("click",function(){
        var $cur_tag_posts=$(this).closest("div.tag-posts");//得到当前的tag
        var cur_page=$cur_tag_posts.find("a.current-page").attr("cur_page");//获取当前的页码
        var next_page=cur_page+1;//获取下一页
        var total_page=$cur_tag_posts.find("a:last").attr("cur_page");//总的页数
        if(next_page<=total_page){
            tag_reset();//复原操作
            $cur_tag_posts.find("a[cur_page='"+(next_page)+"']").attrClass("current-page");//给前一个页码添加current-page样式
            $cur_tag_posts.find("a.post-list-item").hide(250);//隐藏文章
            $cur_tag_posts.find("a.post-list-item").slice((next_page+1)*2,next_page*2).show(400);//显示文章
        }else{
             alert("抱歉，目前达到最大页码，无法给你更多!");
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
//3.显示所有的页码
    $("div.pagination li").show();
}
// FitVids options
$(function() {
  tagDisplay();
  generatePagi();
});
