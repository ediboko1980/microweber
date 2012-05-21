window.mw_editables_created = false;
window.mw_element_id = false;

function mw_delete_element($el_id) {
    if ($el_id == undefined || $el_id == 'undefined') {
        $el_id = window.mw_element_id;
    }
    //	alert($el_id);
    $($el_id).fadeOut().remove();
    $('#' + $el_id).fadeOut().remove();

}

function mw_make_cols($numcols) {



    $('.column').resizable("destroy");
    $('.ui-resizable').resizable("destroy");



    $el_id = window.mw_row_id;
    if ($el_id != undefined && $el_id != false && $el_id != 'undefined') {
        window.mw_sortables_created = false;
        // $('#'+$el_id).columnize({ columns: $numcols, target:'#'+$el_id, buildOnce:true  });
        $exisintg_num = $('#' + $el_id).children(".column").size();


        if ($numcols == 0) {
            $numcols = 1;
        }
        $exisintg_num = parseInt($exisintg_num);
        $numcols = parseInt($numcols);


        if ($exisintg_num == 0) {
            $exisintg_num = 1;
        }


        if ($numcols != $exisintg_num) {



            if (window.console && window.console.log) {
                window.console.log('  $exisintg_num ' + $exisintg_num + '       $numcols ' + $numcols);
            }

            if ($numcols > $exisintg_num) {

                for (i = $exisintg_num; i < $numcols; i++) {
                    $('<div class="column">' + window.mw_empty_column_placeholder + '</div>').appendTo('#' + $el_id);
                }

            } else {


                $cols_to_remove = $exisintg_num - $numcols;
                if (window.console && window.console.log) {
                    window.console.log('$cols_to_remove' + $cols_to_remove);
                }


                if ($cols_to_remove > 0) {

                    for (i = $cols_to_remove; i > 0; i--) {
                        //for (i=0;i<=$cols_to_remove;i++){
                        $ch_n = parseInt($exisintg_num) - parseInt(i);
                        if ($cols_to_remove >= 1) {
                            if (window.console && window.console.log) {
                                window.console.log('$removinc child col' + '#' + $el_id + ">div.column:nth-child(" + $ch_n + ")");
                            }

                            $('#' + $el_id).children(".column:eq(" + $ch_n + ")").fadeOut('slow').remove();

                        }


                    }


                }
            }






            $exisintg_num = $('#' + $el_id).children(".column").size();

            $eq_w = 100 / $exisintg_num;
            $pad = 1;
            $eq_w1 = $eq_w - $pad;
            $('#' + $el_id).children(".column").width($eq_w1 + '%');
            $('#' + $el_id).children(".column").css('float', 'left');
            $('#' + $el_id).children(".column").css('padding-right', $pad + '%');

            $('#' + $el_id).equalWidths().equalHeights();
               $('#' + $el_id).children('.column').height('auto');

            init_sortables()






        }









    }




}

function mw_make_row_editor($el_id) {

    if ($el_id == undefined || $el_id == 'undefined') {
        $el_id = window.mw_row_id;
    } else {
        window.mw_row_id = $el_id;
    }
    $(".mw-layout-edit-curent-row-element").html($el_id);

    $exisintg_num = $('#' + $el_id).children(".column").size();
    $(".mw-make-cols").removeClass('active');
    $(".mw-make-cols-" + $exisintg_num).addClass('active');

    // alert($exisintg_num);
}

function mw_load_new_dropped_modules() {
    $need_re_init = false;
    $(".module_draggable", '.edit').each(function (c) {

        $name = $(this).attr("data-module-name");
        if ($name && $name != 'undefined' && $name != false && $name != '') {
            $el_id_new = 'mw-col-' + new Date().getTime();
            $(this).after("<div class='element' id='" + $el_id_new + "'></div>");
            //  $(this).attr('id', $el_id_column);	
            mw.load_module($name, '#' + $el_id_new);
            $(this).fadeOut().remove();
        }




        $name = $(this).attr("data-element-name");
        if ($name && $name != 'undefined' && $name != false && $name != '') {
            $el_id_new = 'mw-layout-element-' + new Date().getTime();
            $(this).after("<div  id='" + $el_id_new + "'></div>");
            //  $(this).attr('id', $el_id_column);	
            mw.load_layout_element($name, '#' + $el_id_new);
            $(this).fadeOut().remove();
        }








        $need_re_init = true;

    })













    if ($need_re_init == true) {


 $('.column', '.edit').resizable("destroy");
        $('.ui-resizable').resizable("destroy");



       setTimeout("mw_make_handles()", 2000)
	   setTimeout("init_sortables()", 2000)



       
    
		//mw_make_handles()
    }
}


function mw_make_handles() {

    $('.row', '.edit').each(function (index) {


        $has = $(this).children("div:first").hasClass("mw-sorthandle-row");
        if ($has == false) {
            $(this).prepend("<div class='mw-sorthandle mw-sorthandle-row'><span>&nbsp;</span></div>");
        }
    })



    $('.element').each(function (index) {


        $has = $(this).children(":first").hasClass("mw-sorthandle-col");
        if ($has == false) {
            $(this).prepend("<div class='mw-sorthandle-col'><span>&nbsp;</span></div>");
        }
    })
mw_z_index_fix();


}


function mw_z_index_fix(){

 var count = 100;
        $('.mw-sorthandle-row').each(function () {
            // If any label overlaps with the image (used overlaps plugin)
           
                // Increase count (the z-index)
                count += 10;
                $(this).css('z-index', count);
           

        });
		
		 var count = 20000;
		 $('.-handasdle').each(function () {
                 count -= 10;
                $(this).css('z-index', count);
        });
		
		 var count = 20000;
		 $('.uiasd-resizable-handle').each(function () {
                 count -= 10;
                $(this).css('z-index', count);
        });
		
		
		
	
}

function mw_make_css_editor($el_id) {
    if ($el_id == undefined || $el_id == 'undefined') {
        $el_id = window.mw_element_id;
    } else {
        window.mw_element_id = $el_id;
    }
    $(".mw-layout-edit-curent-element").html($el_id);
}

function mw_make_editables() {





    if (window.mw_drag_started == false && window.mw_handle_hover != true) {
        window.mw_sortables_created = false;
        if (window.mw_editables_created == false) {
            $(".edit [draggable='true']").unbind();
            $(".edit [draggable='true']").removeAttr('draggable');


            $('.mw-sorthandle').remove();
            $('.edit').sortable('destroy');
            $('.element').sortable('destroy');
            $('.column').sortable('destroy');
            $('.row').sortable('destroy');
            $(".row,.element", '.edit').enableSelection();
            $(".mw-sorthandle", '.edit').disableSelection();


            $(".edit").freshereditor("edit", true);
            window.mw_editables_created = true
            $("#mw-layout-edit-site-top-bar-r").html("Text edit");

        }

    }


}




window.mw_sortables_created = false;
window.mw_drag_started = false;
window.mw_row_id = false;
window.mw_empty_column_placeholder = '<div class="empty ui-state-highlight ui-sortable-placeholder"><span>Please drag items here</span></div>';
window.mw_empty_column_placeholder2 = '<div class="empty-column"><span>Please drag items here</span></div>';
window.mw_empty_column_placeholder3 = '<div class="empty-column empty-column-big"><span>Please drag items here</span></div>';


function mw_remove_editables() {

    window.mw_editing_started = false;
    window.mw_editables_created = false;
    $(".edit").freshereditor("edit", false);

}

function saveOrder() {
    //var data = $("#gallery li").map(function() { return $(this).data("itemid"); }).get();
    //  $.post("example.php", { "ids[]": data });
};

function init_sortables() {
    // $('#mercury_iframe').contents().find('.edit').html('Hey, i`ve changed content of  body>! Yay!!!');


    mw_remove_editables()

    if (window.mw_sortables_created == false) {



        var place1 = window.mw_empty_column_placeholder;
        var place2 = window.mw_empty_column_placeholder;
        $(".column", '.edit').each(function (c) {
            if ($("div", this).size() == 0) {
                //     $(this).html(place2);
            }
        })

        $('.edit').sortable('destroy');
        $('.element').sortable('destroy');
        $('.column').sortable('destroy');
        $('.row').sortable('destroy');
        $('.modules-list').sortable('destroy');
 $(".column").putPlaceholdersInEmptyColumns()
 
   $('.row').equalHeights()
 
 
        $spans = '.edit div.span1,.edit div.span1,.edit  div.span2,.edit div.span3,.edit div.span4,.edit div.span5,.edit div.span6,.edit div.span7,.edit div.span8,.edit div.span9,.edit div.span10,.edit div.span11,.edit div.span12,div.column';

        $($spans).addClass('column');

        $drop_areas = '.edit,.edit .column,';




        //test $($drop_areas).addClass('ui-state-highlight2');
        $($drop_areas).sortable({
            // items: '.row:not(.disabled),.col',
            items: '.element:not(.edit),li.module-item:not(.edit),.row>.column>.row:not(.edit),.row:not(.edit), .empty:not(.edit), .ui-state-highlight:not(.edit),div.empty-column',
            dropOnEmpty: true,
            forcePlaceholderSize: true,
            forceHelperSize: true,
            greedy: true,
            tolerance: 'pointer',
            //  cancel: 'div.edit',
            cursorAt: {
                top: -2,
                left: -2
            },
              distance:15,
            scrollSensitivity: 40,
               delay: 5,
            scroll: true,

            handle: '.mw-sorthandle-col,.mw-sorthandle-row',
            revert: true,
            //   helper: 'clone',
            placeholder: "ui-state-highlight",
            //placeholder: "empty",
            connectWith: '.edit,.row>.column,' + $drop_areas,
            //	 connectWith: '.row>.column',
            start: function (event, ui) {
                //var place2 = $('<div class="empty ui-state-highlight"><span>Please drag items here</span></div>');
                $('.mw-sorthandle', '.column').remove();
                $('.column', '.edit').resizable("destroy");
                $('.ui-resizable').resizable("destroy");
				 $('.ui-resizable').resizable("destroy");
				 $('.ui-resizable-e', '.column').remove();
				  $('.-e', '.column').remove();
				  $('.ui-resizable', '.column').removeClass('ui-resizable');
				    $('.ui-resizable-autohide').removeClass('ui-resizable-autohide');
					$('.-autohide').removeClass('-autohide');
					$('.ui-resizable').removeClass('ui-resizable');

                $('[contenteditable=true]').attr("contenteditable", false);

 $(".column").putPlaceholdersInEmptyColumns()
 
   $(this).sortable('refreshPositions')
                window.mw_drag_started = true;
                //$(this).append(window.mw_empty_column_placeholder);

 //$(ui.placeholder).hide(300);
                //  $(ui.helper).append(window.mw_empty_column_placeholder);
            },
 
    change: function (e,ui){
		  $(ui.placeholder).show();
		   
			 
			 $rh =  $(ui.placeholder).parent('.row').height();
			   $(ui.placeholder).parent('.column').height($rh);
       //  $(ui.placeholder).show(100);
	   // $(ui.placeholder).slide(100);
    },

            stop: function (event, ui) {
                $('.empty').remove();
                window.mw_drag_started = false;
                $('.column').removeClass('column-outline');
                $('.ui-state-highlight').remove();
				$('.empty-column').remove();

				mw_z_index_fix();
				
 				 $(".column").putPlaceholdersInEmptyColumns()

				
                //  $(".row").equalWidths() ;		
                mw_load_new_dropped_modules();

                $('.row').equalWidths();
                $('.column').height('auto');

 $(this).sortable('refreshPositions')
            },

 sorasdasdt: function (event, ui) {
	 window.mw_drag_started = true;
	  $(ui.placeholder).closest('.column').height('auto');
 },
            sort: function (event, ui) {
               
			   
			    window.mw_drag_started = true;

                // $('.empty', '.edit').remove();
                $(ui.item).css({
                    "width": ui.placeholder.width()
					 
                });
                $(ui.helper).css({
                    "width": ui.placeholder.width()
					
                });
                $(ui.helper).css({
                    "height": ui.placeholder.height()
                });
 //  $(ui.helper).closest(".empty").hide();
 				//$(ui.placeholder).closest('.empty-column').remove();
				 //  $(ui.placeholder).parent('.column').addClass('hl2');
 //  $(ui.placeholder).parent('.column').height('auto');
                // $(ui.placeholder).closest('.column').height('auto');

                //$(ui.placeholder).parent('.row').equalWidths();
                //  $(ui.placeholder).parent('.row').children('.column').height('auto');

                // $(ui.placeholder).parent('.row').equalWidths().equalHeights() ;


                //  $(ui.helper).css({"width" : ui.placeholder.width()});	
                //  $(ui.placeholder).find('.column').html(Number($(".col:visible").index(ui.placeholder)+1));
                // $('.column').children('.empty').css({"height" : ui.item.height()});	

                // $(ui.helper).css({"height" : ui.item.height()});	
                // $(ui.placeholder).css({"height" : ui.item.height()});	
            },




            over: function (event, ui) {


                // $('.empty', '.edit').remove();
                $(ui.helper).css({
                    "width": $(this).width()
					 
                });
                $(ui.item).css({
                    "width": $(this).width()
					
                });
				
				 
				
				
				//   $('.row').equalHeights()
				   
				 //    $rh1 =  $(ui.placeholder).height();
				   
				    $rh =  $(ui.placeholder).parent('.row').height();
			   $(ui.placeholder).parent('.column').height($rh );
				   
				   
   $('.row').children(".column").addClass("mw-outline-column");
           $('.row').children(".mw-sorthandle-row:first").show();
  window.mw_drag_started = true;
	
				
				//  $(ui.placeholder).parent('.column').height('auto');
				  $('.empty-column').show();
 //  $(ui.helper).closest(".empty").hide();
 				//$(ui.placeholder).closest('.empty-column').remove();

                //$(this).closest('.column').height('auto');
  
  
  
// $(".empty-column", '.edit').die('mouseover');
 
     //  $(this).children(".empty-column").remove();
	 //    $(this).parent('.column').height('auto');

                // $(ui.item).css({"width" : ui.placeholder.width()});	
                //  $(ui.helper).css({"width" : ui.placeholder.width()});	
                // $(ui.helper).css({"height" : ui.item.height()});	
                // $(ui.placeholder).css({"height" : ui.item.height()});	
                //$(ui.item).css({"height" :'10px'});
                //$(ui.item).css({"overflow" :'hidden'});
                // $(ui.placeholder).css({"height" : ui.item.height()});



                //  var tr = $(event.target).closest('.empty').show()
              //  $(ui.placeholder).closest('.empty').show()


                $(this).sortable('refreshPositions')

                //  $(ui.placeholder).closest('.row').find('.empty').show()	
                // 	 $(ui.placeholder).closest('.column').find('.empty').show()			
                // $(this).find('.empty').css({"height" : ui.item.height()});
                //	 $(ui.placeholder).closest('.empty').css({"height" : ui.item.height()});
                // ui.helper.width(ui.placeholder.width());
                // ui.helper.height(ui.placeholder.height());
                //   ui.helper.width(ui.placeholder.width());
                //  ui.placeholder.height(ui.helper.height());

                //ui.placeholder.width(ui.item.width());
                // $(this).find('.empty:first').show()
            },

            out: function (event, ui) {
				//$(this).parent('.row').putPlaceholdersInEmptyColumns();
				$('.row').equalHeights()
                $(this).sortable('refreshPositions')
                //$('.edit>.empty').hide()
                // $(this).css('min-height', '10px');
                //	$( this ).sortable( 'refreshPositions' )
                //   $(this).children('.empty').hide() 
                // $(ui.sender).find('.empty').hide()
                //$(ui.sender).find('.ui-state-highlight').fadeOut('fast')
            },

			create: function (en, ui) {
               $(".column").putPlaceholdersInEmptyColumns()
                $(this).sortable('refreshPositions')
            },
			
            activate: function (en, ui) {
               $(".column").putPlaceholdersInEmptyColumns()
                $(this).sortable('refreshPositions')
            },
            deactivate: function (en, ui) {
                window.mw_drag_started = false;

                $('.empty').hide()
                // $('.row').equalWidths().equalHeights() ;
                $(this).css('min-height', '10px');
            }



        });









        $('.modules-list', '#mw_toolbar_tabs').sortable({
            items: '.module_draggable',
            forcePlaceholderSize: true,
            forceHelperSize: true,
            stop: function (event, ui) {
                $('.empty').fadeOut('fast') //.remove();
                $('.ui-resizable').resizable("destroy");
                mw_load_new_dropped_modules();






                $('.row').each(function (index) {



                    $(this).equalWidths().equalHeights();
                });






            },
            connectWith: '.edit,.column,.row>.column'
        });


        /*	$('.edit').sortable({
    items: '.row,.column>.row',
  handle: '.mw-sorthandle-row',
			connectWith: '.edit,.column,.row>.column'
			});	*/



















        $(".module-item").disableSelection();

        $(".mw-sorthandle", '.edit').disableSelection();



        $(".row,.element").die('mousedown');
        $(".element", '.edit').live('mousedown', function (e) {

            $el_id = $(this).attr('id');
            if ($el_id == undefined || $el_id == 'undefined') {
                $el_id = 'mw-element-' + new Date().getTime();
                $(this).attr('id', $el_id);
            }
            window.mw_element_id = $el_id;
            mw_make_css_editor($el_id)

            $(this).freshereditor("edit", true);
            e.stopPropagation();
        });


        $(".row", '.edit').die('click');

        $(".row", '.edit').live('click', function (e) {
            $col_panels = [];
            $el_id = $(this).attr('id');
            if ($el_id == undefined || $el_id == 'undefined') {
                $el_id = 'mw-row-' + new Date().getTime();
                $(this).attr('id', $el_id);
            }
            window.mw_row_id = $el_id;
            mw_make_row_editor($el_id)





            $exisintg_num = $('#' + $el_id).children(".column").size();
            if ($exisintg_num > 0) {
                a = 0;
                $('#' + $el_id).children(".column").each(function () {




                    $col_panels[a] = [{
                        "size": $(this).width()
                    }];
                    $el_id_column = $(this).attr('id');
                    if ($el_id_column == undefined || $el_id_column == 'undefined') {
                        $el_id_column = 'mw-column-' + new Date().getTime();
                        $(this).attr('id', $el_id_column);
                    }





                    a++;
                });
            }










            //e.stopPropagation();
        });



        $(".row", '.edit').die('mouseenter');
        $(".row", '.edit').mouseenter(function () {
            $has = $(this).children(":first").hasClass("mw-sorthandle");
            if ($has == false) {
                $(this).prepend("<div class='mw-sorthandle mw-sorthandle-row'><span>&nbsp;</span>");
            }
            $(this).equalHeights();

            $(".column", '.edit').removeClass("mw-outline-column");

            $(this).children(".column").addClass("mw-outline-column");
            $(this).children(".mw-sorthandle-row:first").show();


        })






        $(".element", '.edit').die('mouseenter');
        $(".element", '.edit').mouseenter(function () {
            $has = $(this).children(":first").hasClass("mw-sorthandle");
            if ($has == false) {
                $(this).prepend("<div class='mw-sorthandle mw-sorthandle-col'><span>&nbsp;</span></div>");
            }

        })




        $("#mw-layout-edit-site-top-bar-r").html("Drag and drop edit");
        window.mw_sortables_created = true

        window.mw_sortables_created = true

    }




}





$('.module', '.edit').die('mouseenter');
$('.module', '.edit').live('mousenter', function (e) {
    $(this).children('[draggable]').removeAttr('draggable')
});





/*$('.column', '.row').die('mouseout');
$('.column', '.row').live('mouseout', function (e) {
   $(this).resizable("disable");  
})*/;


 


$('.column', '.row').die('hover');

$('.column', '.row').live('hover', function (e) {




    $el_id_column = $(this).attr('id');
    if ($el_id_column == undefined || $el_id_column == 'undefined') {
        $el_id_column = 'mw-column-' + new Date().getTime();
        $(this).attr('id', $el_id_column);
        $(this).addClass($el_id_column);
    }

    var parent1 = $(this).parent('.row');
    $(this).css({
        width: $(this).width() / parent1.width() * 100 + "%",
        //      height: ui.element.height()/parent.height()*100+"%"
    });


    $is_done = $(this).hasClass('ui-resizable')
    $ds = window.mw_drag_started;
    if ($is_done == false && $ds == false) {
        $('.also-resize').removeClass('also-resize');
        $('.also-resize-inner').removeClass('also-resize-inner');
        $inner_column = $(this).children(".column:first");
        $prow = $(this).parent('.row').attr('id');
        //$also =  $('#'+$prow).children(".column").not("#"+$el_id_column);

        $also = $(this).next(".column");
        $also_check_exist = $also.size();
        if ($also_check_exist == 0) {
            $also = $(this).prev(".column");

        }

        $also_el_id_column = $also.attr('id');
        if ($also_el_id_column == undefined || $also_el_id_column == 'undefined' || $also_el_id_column == '') {
            $also_el_id_column = 'mw-column-' + new Date().getTime();
            $also.attr('id', $also_el_id_column);
        }


        $also_reverse_id = $also_el_id_column;
        // $also.attr('data-also-resize-inner', $also_reverse_id);
        //  $also.children('.column').attr('data-also-resize-inner', $also_reverse_id);

        $also_inner_items = $inner_column.attr('id');

        // $also.addClass('also-resize');
        //   $inner_column.addClass('also-resize-inner');
       // $(this).resizable("destroy")
        $(this).attr("data-also-rezise-item", $also_reverse_id)
        $(this).resizable({
            grid: [1, 10000],
            handles: 'e',
            containment: "parent",
            //	 aspectRatio: true,
           autoHide: true,

            //alsoResizeReverse:'.also-resize' ,
            alsoResizeReverse: '#' + $also_reverse_id,
            //	alsoResizeReverse:'.column [data-also-resize-inner='+$also_reverse_id+']' ,
            alsoResize: '#' + $also_inner_items,

            // alsoResize:'.also-resize-inner'  ,
            resize: function (event, ui) {
                $(this).css('height', 'auto');
                ui.element.next().children(".row").equalWidths();
                ui.element.children(".row").equalWidths();
                ui.element.parent(".row").equalWidths();
				
                //  $(this ).parent(".row").equalHeights() ;

                // $cols_to_eq =  $(this ).parent(".row").children(".column");
                //$(this ).parent(".row").addClass('also-resize-inner');
            },
            create: function (event, ui) {
                $(".row").equalWidths().equalHeights();


            },


            stop: function (event, ui) {
                var parent = ui.element.parent('.row');
                ui.element.css({
                    width: ((ui.element.width() / parent.width()) - 1) * 100 + "%",
                    //      height: ui.element.height()/parent.height()*100+"%"
                });


                $('.column').css('height', 'auto');
mw_z_index_fix();
            }
        });





    } else {
	// $(this).resizable("enable");  	
	}

    e.preventDefault();
    //event.preventDefault(); // this prevents the original href of the link from being opened
    e.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element




}); 
$('.module', '.edit').live('click', function (e) {




    init_sortables()



    window.mw_making_sortables = false;

    $clicked_on_module = $(this).attr('module_id');
    if ($clicked_on_module == undefined || $clicked_on_module == '') {
        $clicked_on_module = $(this).attr('module_id', 'default');

    }

    if (window.console != undefined) {
        console.log('click on module 1 ' + $clicked_on_module);
    }


    if ($clicked_on_module == undefined || $clicked_on_module == '') {
        $clicked_on_module = $(this).parents('.module').attr('module_id');
    }

    if ($clicked_on_module == undefined || $clicked_on_module == '') {
        $clicked_on_module = $(this).parents('.module').attr('module_id', 'default');

    }

    $('.mw_non_sortable').removeClass('mw_non_sortable');



    // alert($clicked_on_module);


    e.preventDefault();
    //event.preventDefault(); // this prevents the original href of the link from being opened
    e.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
    return false;

});

































/*	
 *	jQuery dotdotdot 1.4.0
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function ($) {
    if ($.fn.dotdotdot) {
        return;
    }

    $.fn.dotdotdot = function (o) {
        if (this.length == 0) {
            debug(true, 'No element found for "' + this.selector + '".');
            return this;
        }
        if (this.length > 1) {
            return this.each(

            function () {
                $(this).dotdotdot(o);
            });
        }


        var $dot = this,
            $tt0 = this[0];

        if ($dot.data('dotdotdot')) {
            $dot.trigger('destroy.dot');
        }

        $dot.bind_events = function () {
            $dot.bind('update.dot', function (e, c) {
                e.preventDefault();
                e.stopPropagation();

                opts.maxHeight = (typeof opts.height == 'number') ? opts.height : getTrueInnerHeight($dot);

                opts.maxHeight += opts.tolerance;

                if (typeof c != 'undefined') {
                    if (typeof c == 'string' || c instanceof HTMLElement) {
                        c = $('<div />').append(c).contents();
                    }
                    if (c instanceof $) {
                        orgContent = c;
                    }
                }

                $inr.empty();
                $inr.append(orgContent.clone(true));

                var after = false,
                    trunc = false;

                if (conf.afterElement) {
                    after = conf.afterElement.clone(true);
                    conf.afterElement.remove();
                }
                if (test($inr, opts)) {
                    if (opts.wrap == 'children') {
                        trunc = children($inr, opts, after);
                    } else {
                        trunc = ellipsis($inr, $inr, opts, after);
                    }
                }
                conf.isTruncated = trunc;
                return trunc;
            });
            $dot.bind('isTruncated.dot', function (e, fn) {
                e.preventDefault();
                e.stopPropagation();

                if (typeof fn == 'function') {
                    fn.call($tt0, conf.isTruncated);
                }
                return conf.isTruncated;
            });
            $dot.bind('originalContent.dot', function (e, fn) {
                e.preventDefault();
                e.stopPropagation();

                if (typeof fn == 'function') {
                    fn.call($tt0, orgContent);
                }
                return orgContent;
            });
            $dot.bind('destroy.dot', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $dot.unwatch();
                $dot.unbind_events();
                $dot.empty();
                $dot.append(orgContent);
                $dot.data('dotdotdot', false);
            });
        }; //	/bind_events
        $dot.unbind_events = function () {
            $dot.unbind('.dot');
        }; //	/unbind_events
        $dot.watch = function () {
            $dot.unwatch();
            if (opts.watch == 'window') {
                $(window).bind('resize.dot', function () {
                    if (watchInt) {
                        clearInterval(watchInt);
                    }
                    watchInt = setTimeout(

                    function () {
                        $dot.trigger('update.dot');
                    }, 10);
                });
            } else {
                watchOrg = getSizes($dot);
                watchInt = setInterval(

                function () {
                    var watchNew = getSizes($dot);
                    if (watchOrg.width != watchNew.width || watchOrg.height != watchNew.height) {
                        $dot.trigger('update.dot');
                        watchOrg = getSizes($dot);
                    }
                }, 100);
            }
        };
        $dot.unwatch = function () {
            if (watchInt) {
                clearInterval(watchInt);
            }
        };

        var orgContent = $dot.contents(),
            opts = $.extend(true, {}, $.fn.dotdotdot.defaults, o),
            conf = {},
            watchOrg = {},
            watchInt = null,
            $inr = $dot.wrapInner('<' + opts.wrapper + ' class="dotdotdot" />').children();

        conf.afterElement = getElement(opts.after, $inr);
        conf.isTruncated = false;

        $inr.css({
            'height': 'auto',
            'width': 'auto'
        });

        $dot.data('dotdotdot', true);
        $dot.bind_events();
        $dot.trigger('update.dot');
        if (opts.watch) {
            $dot.watch();
        }

        return $dot;
    };



    //	public
    $.fn.dotdotdot.defaults = {
        'wrapper': 'div',
        'ellipsis': '... ',
        'wrap': 'word',
        'tolerance': 0,
        'after': null,
        'height': null,
        'watch': false,
        'debug': false
    };


    //	private
    function children($elem, o, after)

    {
        var $elements = $elem.children(),
            isTruncated = false;

        $elem.empty();

        for (var a = 0, l = $elements.length; a < l; a++) {
            var $e = $elements.eq(a);
            $elem.append($e);
            if (after) {
                $elem.append(after);
            }
            if (test($elem, o)) {
                $e.remove();
                isTruncated = true;
                break;
            } else {
                if (after) {
                    after.remove();
                }
            }
        }
        return isTruncated;
    }

    function ellipsis($elem, $i, o, after) {
        var $elements = $elem.contents(),
            isTruncated = false;

        $elem.empty();

        var notx = 'table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, select, optgroup, option, textarea, script, style';

        for (var a = 0, l = $elements.length; a < l; a++) {

            if (isTruncated) {
                break;
            }

            var e = $elements[a],
                $e = $(e);

            if (typeof e == 'undefined') {
                continue;
            }

            $elem.append($e);
            if (after) {
                var func = ($elem.is(notx)) ? 'after' : 'append';
                $elem[func](after);
            }
            if (e.nodeType == 3) {
                if (test($i, o)) {
                    isTruncated = ellipsisElement($e, $i, o, after);
                }
            } else {
                isTruncated = ellipsis($e, $i, o, after);
            }

            if (!isTruncated) {
                if (after) {
                    after.remove();
                }
            }
        }
        return isTruncated;
    }

    function ellipsisElement($e, $i, o, after) {
        var isTruncated = false,
            e = $e[0];

        if (typeof e == 'undefined') {
            return false;
        }

        var seporator = (o.wrap == 'letter') ? '' : ' ',
            textArr = getTextContent(e).split(seporator);

        setTextContent(e, textArr.join(seporator) + o.ellipsis);

        for (var a = textArr.length - 1; a >= 0; a--) {
            if (test($i, o)) {
                var end = getTextContent(e).length - (textArr[a].length + seporator.length + o.ellipsis.length),
                    txt = (end > 0) ? getTextContent(e).substring(0, end) : '';

                setTextContent(e, txt + o.ellipsis);

            } else {
                isTruncated = true;
                break;
            }
        }

        if (!isTruncated) {
            var $w = $e.parent();
            $e.remove();
            $n = $w.contents().eq(-1);

            isTruncated = ellipsisElement($n, $i, o, after);
        }

        return isTruncated;
    }

    function test($i, o) {
        return $i.innerHeight() > o.maxHeight;
    }

    function getSizes($d) {
        return {
            'width': $d.innerWidth(),
            'height': $d.innerHeight()
        };
    }

    function setTextContent(e, content) {
        if (e.innerText) {
            e.innerText = content;
        } else if (e.nodeValue) {
            e.nodeValue = content;
        } else if (e.textContent) {
            e.textContent = content;
        }
    }

    function getTextContent(e) {
        if (e.innerText) {
            return e.innerText;
        } else if (e.nodeValue) {
            return e.nodeValue;
        } else if (e.textContent) {
            return e.textContent;
        } else {
            return "";
        }
    }

    function getElement(e, $i) {
        if (typeof e == 'undefined') {
            return false;
        }
        if (!e) {
            return false;
        }
        if (typeof e == 'string') {
            e = $(e, $i);
            return (e.length) ? e : false;
        }
        if (typeof e == 'object') {
            return (typeof e.jquery == 'undefined') ? false : e;
        }
        return false;
    }

    function getTrueInnerHeight($el) {
        var h = $el.innerHeight(),
            a = ['paddingTop', 'paddingBottom'];

        for (z = 0, l = a.length; z < l; z++) {
            var m = parseInt($el.css(a[z]));
            if (isNaN(m)) {
                m = 0;
            }
            h -= m;
        }
        return h;
    }

    function debug(d, m) {
        if (!d) {
            return false;
        }
        if (typeof m == 'string') {
            m = 'dotdotdot: ' + m;
        } else {
            m = ['dotdotdot:', m];
        }

        if (window.console && window.console.log) {
            window.console.log(m);
        }
        return false;
    }

    //	override jQuery.html
    var _orgHtml = $.fn.html;
    $.fn.html = function (str) {
        if (typeof str == 'string' && this.data('dotdotdot')) {
            this.trigger('update', str);
            return this;
        }
        return _orgHtml.call(this, str);
    };

    //	override jQuery.text
    var _orgText = $.fn.text;
    $.fn.text = function (str) {
        if (typeof str == 'string' && this.data('dotdotdot')) {
            var temp = $('<div />');
            temp.text(str);
            str = temp.html();
            temp.remove();
            this.trigger('update', str);
            return this;
        }
        return _orgText.call(this, str);
    };

})(jQuery);






function closestToOffset(offset) {
    var el = null,
        elOffset, x = offset.left,
        y = offset.top,
        distance, dx, dy, minDistance;
    this.each(function () {
        elOffset = $(this).offset();

        if (
        (x >= elOffset.left) && (x <= elOffset.right) && (y >= elOffset.top) && (y <= elOffset.bottom)) {
            el = $(this);
            return false;
        }

        var offsets = [
            [elOffset.left, elOffset.top],
            [elOffset.right, elOffset.top],
            [elOffset.left, elOffset.bottom],
            [elOffset.right, elOffset.bottom]
        ];
        for (off in offsets) {
            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            distance = Math.sqrt((dx * dx) + (dy * dy));
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                el = $(this);
            }
        }
    });
    return el;
}