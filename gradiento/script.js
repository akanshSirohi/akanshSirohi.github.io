let grad_ids=[1,2];
$(document).ready(function(){
    new ClipboardJS('.cpy');
    const genId = () => {
        grad_ids.push(grad_ids[grad_ids.length-1]+1);
        return grad_ids[grad_ids.length-1];
    };
    const updateCol = ()=>{
        let len=grad_ids.length;
        let cols="";
        let i=1;
        grad_ids.forEach((x)=>{
            let stp=$(`#col_range_${x}`).val();
            cols+=$(`#color_${x}`).val();
            if(i==len) {
                if(stp!=0) {
                    cols+=` ${stp}%`;
                }
            }else{
                if(stp!=0) {
                    cols+=` ${stp}%,`;
                }else{
                    cols+=",";
                }
            }
            i++;
        });
        let deg=$("#degg").val();
        let typ=$("#g_type").val();
        let code="";
        if(typ=="linear") {
            code=`linear-gradient(${deg}deg,${cols})`;
        }else{
            code=`radial-gradient(circle,${cols})`;
        }
        $("#bdy").css("background-image",code);
        $('#gCode').val(code);
    };
    const init = () => {
        $("#deg_num").val($("#degg").val());
        updateCol();
    };
    const remColor = (id) => {
        if(grad_ids.length-1 >= 2) {
            $(`#cont_${id}`).remove();
            let index = grad_ids.indexOf(eval(id));
            console.log('removing id: ',index);
            if (index > -1) {
                grad_ids.splice(index, 1);
            }
            updateCol();
        }
    };
    const updateListeners = () => {
        $(".col_range").on('input',updateCol);
        $(".color").on('input',updateCol);
        $(".minus").click(()=>{
            remColor(this.activeElement.dataset.id);
        });
    };
    $("#degg").on('input',()=>{
        $("#deg_num").val($("#degg").val());
        updateCol();
    });
    $("#deg_num").on('input',()=>{
        $("#degg").val($("#deg_num").val());
        updateCol();
    });
    $("#g_type").change(()=>{
        let typ=$("#g_type").val();
        if(typ=="radial") {
            $(".lin").hide('slow');
        }else{
            $(".lin").show('slow');
        }
        updateCol();
    });
    $("#btn_addGrad").click(()=>{
        let grad_cnt=genId();
        let template=`<div class="form-inline" id="cont_${grad_cnt}">
        <input type="color" value="${randomColor()}" class="color" id="color_${grad_cnt}">&nbsp;&nbsp;&nbsp;
        <input type="range" class="custom-range col_range" id="col_range_${grad_cnt}" step="1" min="0" max="100" value="0" style="width: 55%;">&nbsp;&nbsp;&nbsp;
        <button class="btn btn-secondary minus" data-id="${grad_cnt}"><i class="fa fa-minus-square"></i></button>
    </div>\n`;
        $('#colors_container').append(template);
        updateListeners();
        updateCol();
    });
    updateListeners();
    init();
});