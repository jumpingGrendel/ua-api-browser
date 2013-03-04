var findKey = function(obj, key) {
  var val
    , tRet
    if (obj.hasOwnProperty(key)) {
        val = obj[key]
    }
  for (p in obj) {
    if (p == key) {
      return obj[p]
    } else if (obj[p] instanceof Object) {
      if (obj.hasOwnProperty(p)) {
        tRet = findKey(obj[p], key)
        if (tRet) {
          return tRet
        }
      }
    }
  }
  return false;
}

var isEmpty = function(obj) {
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

$(function() {
  var current_node = {}
    , final_id
    , _do_call = function() {
        $.getJSON('/call/'
          , function (resp) {
            console.log(resp)
          }
        ).error(
          function(resp) {
            handle_error(resp)
          }
        )
    }
    , api_host = 'https://go.urbanairship.com'
    , get_final_select = function() {
        $.each($('select'), function() {
          var id = $(this).find(':selected')[0].id
          if(id) {
            final_id = id
          }
        })
        var final_select = findKey(api_structure, final_id)
        return final_select
    }
    , build_actions = function() {
        var final_select = get_final_select()
        if(final_select.actions) {
          var n = 0;
          
          Object.keys(final_select.actions).forEach(function(node) {
            var fieldset = $('#main_endpoints')
            var checked = true
            if(n > 0)
              checked = false
            var radio = $('<div class="type_radio col three offset-1 action"><input type="radio" value="' + node + '" name="actions" checked=' + checked + ' id="' + node + '"></input><label for="' + node + '">' + node + '</label></div>')
            n++
            var insert_point = $('.first_sub').last()
            if(!insert_point[0]) {
              insert_point = $('<div class="col four first_sub">&nbsp;</div>')
              $('#main_endpoints').append(insert_point)
            }
            radio.insertAfter(insert_point)
            fieldset.find('input[name=actions]').change(build_extras)
          })
        }      
    }
    , build_extras = function() {
        $('.extras').remove()
        var final_select = get_final_select()
          , n = 0
          , checked_action = $('input[name=actions]:checked', '#main_form')[0].id
          , fieldset = $('#main_endpoints')
          , checked = true

          Object.keys(final_select.actions[checked_action]).forEach(function(key) {
            if(typeof(final_select.actions[checked_action][key]) == 'object') {
              var subnode = final_select.actions[checked_action][key]
              var subnode_div = $('<div id="' + key + '" class="subnode col eight offset-1 extras"><span class="col eight">' + key + '</span></div>')
              Object.keys(subnode).forEach(function(key, idx) {
                if(typeof(subnode[key]) === 'object') {
                  Object.keys(subnode[key]).forEach(function(item, idx) {
                    var input = $('<div class="col six"><label for="' + item + '">' + item + '</label><input type="text" id="' + item + '" value="' + subnode[key][item] + '"></div>')
                    input.on('keyup', update_curl_command)
                    subnode_div.append(input)
                  })
                } else {
                  var input = $('<div class="col six"><label for="' + key + '">' + key + '</label><input type="text" id="' + key + '" value="' + subnode[key] + '"></div>')
                  if((idx + 1) % 2 !== 0) {
                    input.addClass('clear')
                  }
                  input.on('keyup', update_curl_command)
                  subnode_div.append(input)
                }
              })
              fieldset.append(subnode_div)
            } else {
              var input = $('<div class="single col four offset-1 clear extras"><label for="' + key + '">' + key + '</label><input type="text" id="' + key + '" value="' + final_select.actions[checked_action][key] + '"></div>')
              input.on('keyup', update_curl_command)
              fieldset.append(input)
            }
          })

      update_curl_command()
    }
    , update_curl_command = function() {
        console.log("updating")
        var curl_command_container = $('#curl_command')
        var uri = ''
        $.each($('select'), function() {
          var id = $(this).find(':selected')[0].id
          if(id) {
            uri += $(this).val()
            final_id = id
          }
        })
        var api_data = findKey(api_structure, final_id)
        var type = 'GET'
        var checked_type = $('input[name=actions]:checked', '#main_form')
        try {
          type = checked_type[0].value
        } catch(e) {
          //who cares?
        }
        var checked_fieldset = checked_type.parent().parent()
        var inputs = checked_fieldset.find('input[type=text]')
        var text = 'curl -i -X ' + type + ' -u "' + $('#app_key').val() + ':' + $('#master_secret').val() + '" '

        if(type === 'GET') {
          var params = ''
          if(inputs) {
            $.each(inputs, function(a,b) {
              if(uri.match('{' + b.id + '}')) {
                uri = uri.replace('{' + b.id + '}', b.value)
              } else {
                params += b.id + '=' + b.value + '&'
              }
            })
          }
          text += "'" + api_host + uri
          if(params) {
            text += '?' + params
          }
          text += "'"
        } else if((type === 'PUT') || (type === 'POST')) {
          var data = {}
          $.each($('.subnode'), function(idx, node) {
            data[node.id] = {}
            var subnode = findKey(api_structure, node.id)
            var sub_inputs = $(node).find('input[type=text]')
            if($.isArray(subnode)) {
              data[node.id] = []
              $.each(sub_inputs, function(idx, item) {
                data[node.id].push(item.value)
              })
            } else {
              $.each(sub_inputs, function(c,d) {
                var key = d.id
                var val = d.value
                data[node.id][key] = val
              })
            }
          })
          if(inputs) {
            $.each($('.single'), function(a,b) {
              input = $(b).find('input').first()[0]
              var key = input.id
              var val = input.value
              if(uri.match('{' + key + '}')) {
                uri = uri.replace('{' + key + '}', val)
              } else {
                data[key] = val
              }
            })
          }
          if(!isEmpty(data)) {
            text += ' -H "Content-Type: application/json" --data \'' + JSON.stringify(data) + "' "         
          }
          text += "'" + api_host + uri + "'"
        } else if(type === 'DELETE') {
          if(inputs) {
            $.each($('.single'), function(a,b) {
              input = $(b).find('input').first()[0]
              var key = input.id
              var val = input.value
              if(uri.match('{' + key + '}')) {
                uri = uri.replace('{' + key + '}', val)
              }
            })
          }
          text += "'" + api_host + uri + "'"
        }

        curl_command_container.text(text)
    }
    , select_changed = function() {
        var active_id = $(this)[0].id
        if(active_id == 'main_endpoint') {
          $('.sub_module').remove()
        }
        $('.extras').remove()
        $('.action').remove()
//        $('.first_sub').remove()
        var id = $(this).find(':selected')[0].id
        if(!id) {
          return
        }
        build_module(id)
        build_actions()
        build_extras()
    }
    , build_module = function(id) {
        var sub_struct = api_structure[id]
          , div = $('<div class="col four first_sub"></div>')
          , select = $('<select id="' + id + '" class="sub_module"></select>')
          , fieldset = $('#main_endpoints')
          , proceed = true
        try {
          Object.keys(sub_struct.subset)
        } catch(e) {
          proceed = false
        }
        
        if(proceed) {
          select.append($('<option>--api endpoint--</option>'))
          Object.keys(sub_struct.subset).forEach(function(node, n) {
            var option = $('<option id="' + node + '">' + sub_struct.subset[node].uri + '</option>')
            select.append(option)
          })
          div.append(select)
          fieldset.append(div)
          select.on('change', select_changed)
        }
    }
    , build_main = function() {
      var fieldset = $('#main_endpoints')
        , div = $('<div class="col four offset-1"></div>')
        , select = $('<select id="main_endpoint" class=""></select>')
        select.append($('<option>--api endpoint--</option>'))
        Object.keys(api_structure).forEach(function(node, n) {
          var option = $('<option id="' + node + '">' + api_structure[node].uri + '</option>')
          select.append(option)
        })
      div.append(select)
      fieldset.append(div)
    }

  build_main()
  $('#main_endpoint').on('change', select_changed)
  $('#app_key').on('keyup', update_curl_command)
  $('#master_secret').on('keyup', update_curl_command)
  $('#curl_command').click(function() {
    $(this).select()
  })
    
  $('#go').on('click', function() {
    _do_call()
    return false
  })
})
