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
console.log($('#orcamento_vei_tipo').val())

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

if ($('#orcamento_vei_tipo').val() != 'Nautica'){
  console.log('if')
  fipe();
} if ($('#orcamento_vei_tipo').val() == 'Nautica') {
  console.log('else')
  nautica();
};
//atualiza valor
  let dl5 = $('#orcamento_seguro_preco_final');
  let dl6 = $('#orcamento_seguro_preco') ;
  $(dl5).val($(dl6).val());
  let dl7 = $('#seguro_final');

  parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

//update info on seguros carros




$('#orcamento_seg_car_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });


$('#orcamento_seg_car_reboque_500').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 25)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 25)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 2)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 2)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_vidros').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_reserva_7d').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_reserva14').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 14)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 14)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
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

$('#orcamento_seg_car_imp_reserva_7d').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });

$('#orcamento_seg_car_imp_reserva14').click(function() {
  if($(this).is(':checked')){
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
    $(dl5).val(parseFloat($(dl5).val())  + 26.89)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 26.89)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });


$('#orcamento_seg_cam_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 77.50)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 77.50)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });
$('#orcamento_seg_cam_terceiros_100k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 89.33)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 89.33)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
    }

  });
$('#orcamento_seg_cam_terceiros_200k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 108.19)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 108.19)
    parseFloat($(dl7).text($(dl5).val() )).toFixed(2); 
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


//update data on user_profile



$('#orcamento_cli_cep').change(function() {
endpoint = 'https://viacep.com.br/ws/' +  $('#orcamento_cli_cep').val() + '/json/';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #endereco
  let dl8 = $('#orcamento_cli_end').val(data.logradouro);
  let dl9 = $('#orcamento_cli_end_bairro').val(data.bairro);
  let dl10 = $('#orcamento_cli_end_cidade').val(data.localidade);

  });
});
















});