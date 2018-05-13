

//this function can remove a array element.
          Array.remove = function(array, from, to) {
              var rest = array.slice((to || from) + 1 || array.length);
              array.length = from < 0 ? array.length + from : from;
              return array.push.apply(array, rest);
          };

          //this variable represents the total number of popups can be displayed according to the viewport width
          var total_popups = 0;

          //arrays of popups ids
          var popups = [];

          //this is used to close a popup
          function close_popup(id)
          {
              for(var iii = 0; iii < popups.length; iii++)
              {
                  if(id == popups[iii])
                  {
                      Array.remove(popups, iii);

                      //document.getElementById(id).style.display = "none";
                      document.getElementById(id).remove();
                      calculate_popups();

                      return;
                  }
              }
          }

          //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
          function display_popups()
          {
              //popup đầu tiên cách bên phải 220px
              var right = 227;

              var iii = 0;
              //hiển thị các popup trong màn hình
              for(iii; iii < total_popups; iii++)
              {
                  if(popups[iii] != undefined)
                  {
                      //độ rộng các popup là 270px
                      var element = document.getElementById(popups[iii]);
                      element.style.right = right + "px";
                      right = right + 270;
                      element.style.display = "block";
                  }
              }
              // vuot qua man hinh thì ẩn đi
              for(var jjj = iii; jjj < popups.length; jjj++)
              {
                  var element = document.getElementById(popups[jjj]);
                  element.style.display = "none";
              }
          }

          //creates markup for a new popup. Adds the id to popups array.
          function register_popup(id, name)
          {
              console.log(name + '  ' +id);
              for(var iii = 0; iii < popups.length; iii++)
              {
                  //already registered. Bring it to front.
                  console.log(popups);
                  if(id == popups[iii])
                  {
                      Array.remove(popups, iii);

                      popups.unshift(id);

                      calculate_popups();


                      return;
                  }
              }

              //var element = '<div class="popup-box chat-popup" id="'+ id +'">';
           var element = '<div class="row chat-window col-xs-5 col-md-3" id="'+ id +'" style="margin-left:10px;">';
               element = element + '<div class="col-xs-12 col-md-12">'
              element = element  +'<div class="panel panel-default">';
              element = element+    '<div class="panel-heading top-bar">'
                      +'<div class="col-md-8 col-xs-8">'
                      + '   <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> '+ name +'</h3>'
                      +'</div>'
                      +'<div class="col-md-4 col-xs-4" style="text-align: right;">'
                        +'  <a href="#"><span id="minim_chat_window" class="glyphicon glyphicon-minus icon_minim"></span></a>'
                        + ' <a href="javascript:close_popup(\''+ id +'\');"><span class="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>'
                      +'</div>'
                  +'</div>';

              element = element +'  <div class="panel-body msg_container_base">'

                    +'<div class="row msg_container base_sent">'
                    +    '<div class="col-md-10 col-xs-10 ">'
                    +       '<div class="messages msg_sent">'
                    +       '     <p> chúc ngủ ngon '
                    +           ' hehehe</p>'
                    +            '<time datetime="2009-11-13T20:00">Timothy • 51 min</time>'
                    +       '</div>'
                    +    '</div>'
                    +   ' <div class="col-md-2 col-xs-2 avatar">'
                    +       ' <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/16/User-blue-icon.png" class=" img-responsive ">'
                    +    '</div>'
                    +'</div>'
                +'</div>';


                element = element + ' <div class="panel-footer">'
                        +'<div class="input-group">'
                          +'  <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Write your message here..." />'
                          +  '<span class="input-group-btn">'
                          +  '<button class="btn btn-primary btn-sm" id="btn-chat">Send</button>'
                          +  '</span>'
                        +'</div>'
                +'</div>'
                // element = element + '</div>'
                 + '</div>';
              element = element + '</div>';

              document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;

              popups.unshift(id);

              calculate_popups();

          }
          $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
          $this.parents('.panel').find('.panel-body').slideUp();
          $this.addClass('panel-collapsed');
          $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
          $this.parents('.panel').find('.panel-body').slideDown();
          $this.removeClass('panel-collapsed');
          $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
        });
        $(document).on('focus', '.panel-footer textarea .chat_input', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
          $this.parents('.panel').find('.panel-body').slideDown();
          $('#minim_chat_window').removeClass('panel-collapsed');
          $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
        });
        // $(document).on('click', '#new_chat', function (e) {
        // var size = $( ".chat-window:last-child" ).css("margin-left");
        // size_total = parseInt(size) + 400;
        // alert(size_total);
        // var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
        // clone.css("margin-left", size_total);
        // });
        // $(document).on('click', '.icon_close', function (e) {
        // //$(this).parent().parent().parent().parent().remove();
        // $( "#chat_window_1" ).remove();
        // });

          //calculate the total number of popups suitable and then populate the toatal_popups variable.
          function calculate_popups()
          {
              var width = window.innerWidth;
              //nếu màn hinh sinh ra nhỏ hơn 540 thì chưa có popup nào dc mở
              if(width < 540)
              {
                  total_popups = 0;
              }
              else
              {
                  width = width - 200;
                  //270 là kích thước của 1 popup ,tính số popup trên màn hình
                  total_popups = parseInt(width/270);
              }

              display_popups();

          }

          //recalculate when window is loaded and also when window is resized.
          window.addEventListener("resize", calculate_popups);
          window.addEventListener("load", calculate_popups);
