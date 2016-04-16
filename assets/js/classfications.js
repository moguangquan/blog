/*分类的js */
/**
 * 分类展示
 * 点击左侧的分类展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
    /*only show All*/
    $('.post-list-body>div[post-cate!=first-cate]').hide();
    /*show category when click categories list*/
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate'); //get category's name
        $('.post-list-body>div[post-cate!=' + cate + ']').hide(250);
        $('.post-list-body>div[post-cate=' + cate + ']').show(400);
        generatePagi();
    });
}
/**
*生成分页
*/
function generatePagi() {
        var dataSource = $.makeArray($('.post-list-body').children(":visible"));
        if(!dataSource.length) {
            return false;
        }

        $('.post-list-body #paginator').pagination({
            dataSource: dataSource,
            pageSize: 2,
            callback: function(data, pagination) {
                $(dataSource).hide();
                $(data).show();
            }
        });

}
// FitVids options
$(function() {
  generatePagi();
  categoryDisplay();
});
