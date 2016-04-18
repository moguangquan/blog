/*分类的js */
/**
 * 分类展示
 * 点击左侧的分类展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
    /*only show All*/
    $('.post-list-body').find('div:first').nextAll().hide();
    /*show category when click categories list*/
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate'); //get category's name
        $('.post-list-body>div[post-cate!=' + cate + ']').hide(250);
        $('.post-list-body>div[post-cate=' + cate + ']').show(400);
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
            $("a[cur_page='"+(cur_page+2)+"']").closest("li").prevAll().hide();//隐藏页码
            $("a[cur_page='"+(cur_page-2)+"']").closest("li").nextAll().show();//显示页码
        }
    });
    //前一页
    $("div.pagination .prev").on("click",function(){
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
    $("div.pagination .next").on("click",function(){
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
  categoryDisplay();
  generatePagi();
});
