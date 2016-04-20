/*归档分类的js */
/**
 * 分类展示
 * 点击左侧的分类展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function archiveDisplay() {
   /*only show first cate*/
    var $first_cate_posts=$('.post-list-body').find('div:first');
    $first_cate_posts.nextAll().hide();//隐藏除第一个文章块下的文章
    //初始化第一个标签的隐藏文章
    $first_cate_posts.find("a.post-list-item").hide();//隐藏文章
    $first_cate_posts.find("a.post-list-item").slice(0,5).show();//显示文章
    //第一个标签下的页码
    var $first_cate_paginator=$first_cate_posts.find("div.pagination");
    if($first_cate_paginator){
        $first_cate_paginator.find("li:first").addClass("current-page");//给页码一添加current-page样式
    }
    $('.categories-list-item').click(function() {
        archive_reset();
        var cate = $(this).attr('cate'); //get archive name
        var $cur_archive_posts=$(document.getElementsByName(cate)[0]);
        $('.post-list-body>div').hide(250);
        $cur_archive_posts.show(400);
        //隐藏该标签下的部分文章
        $cur_archive_posts.find("a.post-list-item").hide();//隐藏文章
        $cur_archive_posts.find("a.post-list-item").slice(0,5).show();//显示文章
         //第一个标签下的页码
        var $cur_archive_paginator=$cur_archive_posts.find("div.pagination");
        if($cur_archive_paginator){
         $cur_archive_paginator.find("a:first").addClass("current-page");//给页码一添加current-page样式
        }
    });
}
/**
复原操作，在所有点击操作之前发生一次
*/
function archive_reset(){
//1.清除所有的class为cur_page的a标签
    $("div.pagination a").removeClass("current-page");
//2.隐藏所有文章
    $("a.post-list-item").hide();
//3.显示所有的页码
    $("div.pagination li").show();
}
// FitVids options
$(function() {
  archiveDisplay();
  generatePagi();
});
