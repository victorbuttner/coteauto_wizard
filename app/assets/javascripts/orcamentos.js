$(document).ready(function() {


//esconde elementos:
$('#phone').fadeOut();
$('#email').fadeOut();
//
$('#veiculo').fadeOut();
$('#ano').fadeOut();
$('#cep').fadeOut();
$('#nacionalidade').fadeOut();
$('#tipo_uso').fadeOut();
$('#preco').fadeOut();
//
$('#nome').on('keyup',(function()  {
  $('#phone').fadeIn();
}))
$('#phone').on('keyup',(function()  {
  $('#email').fadeIn();
}))



//update data on veicle information

function fipe() {
console.log('FIPE')
$('#marca').fadeIn();
$.get('https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('õ','o') + '/marcas.json', function(data) {
// populate #brand
let dl1 = $('#orcamento_vei_marca');
console.log("marcas" + JSON.stringify(data));
$(dl1).find('option').remove();
$(dl1).append('<option>', {id: 0 , value: 'selecione', text: 'selecione'})
$.each(data, function(index, value) {
  $(dl1).append($('<option>', {
    id: value.id,
    value: value.name,
    text: value.name
  }));
});
});

$('#orcamento_vei_marca').change(function() {
$('#veiculo').fadeIn();

endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('õ','o') + '/veiculos/'+ $('#orcamento_vei_marca').children(":selected").attr("id") + '.json';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #orcamento_vei_veiculo
  let dl2 = $('#orcamento_vei_veiculo');
  $(dl2).find('option').remove();
  $(dl2).append('<option>', {id: 0 , value: 'selecione', text: 'selecione'})

  $.each(data, function(index, value) {
    $(dl2).append($('<option>', {
      id: value.id,
      value: value.name,
      text: value.name
    }));
  });
});
});


$('#orcamento_vei_veiculo').change(function() {
$('#ano').fadeIn();

endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('õ','o') + '/veiculo/' + $('#orcamento_vei_marca').children(":selected").attr("id") + '/' + $('#orcamento_vei_veiculo').children(":selected").attr("id") + '.json';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #orcamento_vei_modelo_ano
  let dl3 = $('#orcamento_vei_modelo_ano');
  $(dl3).find('option').remove();
  $(dl3).append('<option>', {id: 0 , value: 'selecione', text: 'selecione'})
  $.each(data, function(index, value) {
    $(dl3).append($('<option>', {
      id: value.key,
      value: value.name,
      text: value.name
    }));
  });
});
});

$('#orcamento_vei_modelo_ano').change(function() {
$('#cep').fadeIn();
$('#nacionalidade').fadeIn();
$('#tipo_uso').fadeIn(); 
endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('õ','o') + '/veiculo/' + $('#orcamento_vei_marca').children(":selected").attr("id") + '/' + $('#orcamento_vei_veiculo').children(":selected").attr("id") + '/' +  $('#orcamento_vei_modelo_ano').children(":selected").attr("id") + '.json';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #veicle_price
  let dl4 = $('#orcamento_vei_preco');
  $(dl4).find('option').remove();
$.get(endpoint, function(data) {
  // set #price
 		$(dl4).val(parseFloat(data.preco.replace('R$ ','').replace('.','').replace(',','.')));
});
});
});

};

function nautica() {
  $('#marca').on('keyup',(function()  {
  $('#veiculo').fadeIn();
  }))
  $('#veiculo').on('keyup',(function()  {
  $('#ano').fadeIn();
  }))
  $('#ano').on('keyup',(function()  {
  $('#preco').fadeIn();
  }))
  $('#preco').on('keyup',(function()  {
  $('#cep').fadeIn();
  }))
  $('#cep').on('keyup',(function()  {
  $('#nacionalidade').fadeIn();
  }))
$('#nacionalidade').on('click',(function()  {
  $('#tipo_uso').fadeIn();
  }))
}

if ($('#orcamento_vei_tipo').val() != 'Nautica' && $('#orcamento_current_step').val() == 'veicle_data'){
  console.log('if')
  fipe();
} if ($('#orcamento_vei_tipo').val() == 'Nautica' && $('#orcamento_current_step').val() == 'veicle_data') {
  console.log('else')
  nautica();
};



  if ($('#orcamento_current_step').val() == 'select_seg'){
//atualiza valor
  let dl5 = $('#orcamento_seguro_preco_final');

  $('#orcamento_seguro_plan_bsico').click(function()  {
    console.log('checked')
    let plan_price = $('#orcamento_seguro_preco_silver').val()

  parseFloat($(dl5).val(plan_price)); 

  })
  $('#orcamento_seguro_plan_gold').click(function()  {
    console.log('checked')
    let plan_price = $('#orcamento_seguro_preco_default').val()

  parseFloat($(dl5).val(plan_price)); 

  })

    $('#orcamento_seguro_plan_vip').click(function()  {
    console.log('checked')
    let plan_price = $('#orcamento_seguro_preco_pro').val()

  parseFloat($(dl5).val(plan_price)); 

  })
    $('#seguro_final').text($(dl5).val())  


}

//update info on seguros carros
if ($('#orcamento_current_step').val() == 'finish_profile'){
let dl5 = $('#orcamento_seguro_preco_final');
 
$('#seguro_final').text($(dl5).val())  


$('#orcamento_seg_car_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 2)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 2)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_vidros').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_reserva_7d').click(function() {
   if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())  - 10)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_reserva14').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 14)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    console.log('7d deselect')
    $(dl5).val(parseFloat($(dl5).val())  - 14)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });




//carro importado

$('#orcamento_seg_car_imp_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 12)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 12)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });


$('#orcamento_seg_car_imp_reboque_500').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 33)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 33)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_imp_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 3)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 3)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_imp_vidros').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 20)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 20)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });
//
//$('orcamento_seg_car_reserva_7d_true').click(function() {
//  if($(this).is(':checked')){
//    console.log('chedked')
//    $(dl5).val(parseFloat($(dl5).val())  + 10)
//    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
//
//  }else{
//    $(dl5).val(parseFloat($(dl5).val()) - 10)
//    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
//    }
//
//  });
//
$('#orcamento_seg_car_imp_reserva14').click(function() {
  if($(this).filter(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 14)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 14)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

//update price moto

$('#orcamento_seg_moto_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });


$('#orcamento_seg_moto_reboque_500').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 25)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 25)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });


//update price caminão

$('#orcamento_seg_cam_reboque_300').click(function() {
  if($(this).is(':checked')){
    //$('#seguro_final').val($('#seguro_final').val() + 26.89)
    $(dl5).val(parseFloat($(dl5).val())  + 26.89)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2);

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 26.89)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2);  
    }

  });


$('#orcamento_seg_cam_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 77.50)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 77.50)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });
$('#orcamento_seg_cam_terceiros_100k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 89.33)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 89.33)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });
$('#orcamento_seg_cam_terceiros_200k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 108.19)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 108.19)
    parseFloat($('#seguro_final').text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_cam_vidros').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 30)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 30)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

}
















});