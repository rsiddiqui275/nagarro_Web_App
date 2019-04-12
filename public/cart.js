$(() => {

    refreshList();
    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined){
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
        $('#logout').prop('hidden',false)
    }
    $('#logout').click(()=>{
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        location.href = '/';
    })



})

function refreshList(){
    $('#cartTable').empty();
    $.get('/carts/'+sessionStorage.getItem('id'),(data)=>{
        if(data.data.length!=0){
          
            var htmlContent;
            var TotalCost = 0;
            for(product of data.data){
                htmlContent += `
                <tr>
                    <td>${product.product.name}</td>
                    <td>${product.product.vendor.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.cost}</td>
                </tr>
                `;
                TotalCost += product.cost;
            }
            $('#cartTable').append(htmlContent);
            costHtml = `<br><h5 class="float-right">Total: <em>${TotalCost}</em></h5>`
            // $('#tCost').append(costHtml);
            $('#tCost').val(costHtml);
            $('#tCost').append(costHtml);
        }else {
            $('#cartDiv').append(`No database `);
        }
    })
}
