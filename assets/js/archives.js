/*归档分类的js */
/**
 * 分类展示
 * 点击左侧的分类展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function archiveDisplay() {
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate'); //get archive name
        $('.post-list-body>a[post-cate!=' + cate + ']').hide(250);
        $('.post-list-body>a[post-cate=' + cate + ']').show(400);
    });
}
// FitVids options
$(function() {
  archiveDisplay();
});
