/*标签的js */
/**
 * 分类展示
 * 点击左侧的标签展示时
 * 右侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function tagDisplay() {
    /*only show first tag*/
    //$('.post-list-body>div[post-cate!=first-tag]').hide();
    $('.post-list-body').find('div:first').nextAll().hide();
    /*show tag when click tag list*/
    $('.tag').click(function() {
        var cate = $(this).attr('cate'); //get tag's name
        $('.post-list-body>div').hide(250);
        $(document.getElementsByName(cate)[0]).show(400);
       // generatePagi();
    });
   // generatePagi();
}
/**
*生成分页

function generatePagi() {
        var dataSource = $.makeArray($('.post-list-body').children(":visible"));
        if(!dataSource.length) {
            return false;
        }

        $('.main_content #paginator').pagination({
            dataSource: dataSource,
            pageSize: 2,
            callback: function(data, pagination) {
                $(dataSource).hide();
                $(data).show();
            }
        });

}*/
// FitVids options
$(function() {
  tagDisplay();
});
