/*标签的js */
/**
 * 分类展示
 * 点击左侧的标签展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function tagDisplay() {
    /*only show first tag*/
    $('.post-list-body>div[post-cate!=first-tag]').hide();
    /*show tag when click tag list*/
    $('.tag').click(function() {
        var cate = $(this).attr('cate'); //get tag's name
        $('.post-list-body>div').hide(250);
        $(document.getElementsByName(cate)[0]).show(400);
    });
}
// FitVids options
$(function() {
  tagDisplay();
});
