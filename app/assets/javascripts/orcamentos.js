$(function() {


//update data on veicle information

$('#orcamento_vei_tipo').click(function() {
$.get('https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('õ','o') + '/marcas.json', function(data) {
// populate #brand
let dl1 = $('#orcamento_vei_marca');
console.log("marcas" + JSON.stringify(data));
$(dl1).find('option').remove();
$.each(data, function(index, value) {
  $(dl1).append($('<option>', {
    id: value.id,
    value: value.name,
    text: value.name
  }));
});
});
});



$('#orcamento_vei_marca').change(function() {
endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('ẽ','e') + '/veiculos/'+ $('#orcamento_vei_marca').children(":selected").attr("id") + '.json';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #orcamento_vei_veiculo
  let dl2 = $('#orcamento_vei_veiculo');
  $(dl2).find('option').remove();
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
endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('ẽ','e') + '/veiculo/' + $('#orcamento_vei_marca').children(":selected").attr("id") + '/' + $('#orcamento_vei_veiculo').children(":selected").attr("id") + '.json';
console.log("URL")
console.log(endpoint);
$.get(endpoint, function(data) {
console.log(JSON.stringify(data))
  // populate #orcamento_vei_modelo_ano
  let dl3 = $('#orcamento_vei_modelo_ano');
  $(dl3).find('option').remove();
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
endpoint = 'https://fipeapi.appspot.com/api/1/' + $('#orcamento_vei_tipo').val().toLowerCase().replace('ẽ','e') + '/veiculo/' + $('#orcamento_vei_marca').children(":selected").attr("id") + '/' + $('#orcamento_vei_veiculo').children(":selected").attr("id") + '/' +  $('#orcamento_vei_modelo_ano').children(":selected").attr("id") + '.json';
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


  let dl5 = $('#orcamento_seguro_preco_final');
  let dl6 = $('#orcamento_seguro_preco') ;
  $(dl5).val($(dl6).val());
  let dl7 = $('#seguro_final');

  $(dl7).text($(dl5).val() ); 

//update info on seguros carros




$('#orcamento_seg_car_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 10)
    $(dl7).text($(dl5).val() ); 
    }

  });


$('#orcamento_seg_car_reboque_500').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 25)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 25)
    $(dl7).text($(dl5).val() ); 
    }

  });

$('#orcamento_seg_car_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 2)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 2)
    $(dl7).text($(dl5).val() ); 
    }

  });

$('#orcamento_seg_car_vidros').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    $(dl7).text($(dl5).val() ); 
    }

  });

$('#orcamento_seg_car_reserva_7d').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 10)
    $(dl7).text($(dl5).val() ); 
    }

  });

$('#orcamento_seg_car_reserva14').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 20)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 20)
    $(dl7).text($(dl5).val() ); 
    }

  });

//update price moto

$('#orcamento_seg_moto_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 10)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 10)
    $(dl7).text($(dl5).val() ); 
    }

  });


$('#orcamento_seg_moto_reboque_500').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 25)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 25)
    $(dl7).text($(dl5).val() ); 
    }

  });

//update price caminão
$('#orcamento_cam_reboque_300').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 26,89)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val())- 26,89)
    $(dl7).text($(dl5).val() ); 
    }

  });


$('#orcamento_seg_cam_terceiros_50k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 77.50)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 77.50)
    $(dl7).text($(dl5).val() ); 
    }

  });
$('#orcamento_seg_cam_terceiros_100k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 89.33)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 89.33)
    $(dl7).text($(dl5).val() ); 
    }

  });
$('#orcamento_seg_cam_terceiros_200k').click(function() {
  if($(this).is(':checked')){
    $(dl5).val(parseFloat($(dl5).val())  + 108.19)
    $(dl7).text($(dl5).val() ); 

  }else{
    $(dl5).val(parseFloat($(dl5).val()) - 108.19)
    $(dl7).text($(dl5).val() ); 
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