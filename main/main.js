'use strict'

const allitem=require("./datbase.js").loadAllItems();
const onsaleitem=require("./datbase.js").loadPromotions();
module.exports = {
    printInventory:printInventory
};

function printInventory(arr)
{
    var l = stat(arr);
    var s;
    s = '***<没钱赚商店>购物清单***\n'
    //console.log('***<没钱赚商店>购物清单***\n';
    s = s+print(l);
    s = s + '----------------------\n'+'挥泪赠送商品：\n';
    //console.log('----------------------\n');
    //console.log('挥泪赠送商品：\n');
    s = s+free(l);
    //console.log('----------------------\n');
    s = s+'----------------------\n';
    s = s+total(l);
    s = s+'**********************';
    console.log(s);
    //console.log('**********************\n');
    //console.log(result);
    //console.log(list);
    //
}

function stat(arr)
{
    var list = new Array();   //购物清单
    //先把购买的所有物品进行分类统计,得到雪碧5瓶,荔枝2斤,方便面3袋
    var k;
    var c;
    k=0;
    c=1;
    for(var i=1; i<arr.length; i++)
    {
        if(arr[i] === arr[i-1])
        {
            c++;
            list[k]={'name':arr[i],'count':c};
        }
        else{
            if(arr[i].length === 10)
            {
                c = 1;
                k++;
                list[k] = {'name':arr[i],'count':c};
            }
            else {
                c = parseInt(arr[i].charAt(11));
                k++;
                list[k] = {'name':arr[i].substring(0,10),'count':c}
            }
        }
    }
    return list;
}

function print(list)
{
    var s1='';
    var rc;
    var flag;
    for(var i=0; i<list.length;i++)
    {
        for(var j=0; j<allitem.length; j++)
        {
            if(list[i].name === allitem[j].barcode)
            {
                flag = 0;
                for(var k=0; k<onsaleitem[0].barcodes.length; k++)
                {
                    if(list[i].name === onsaleitem[0].barcodes[k])
                    {
                        flag = 1;
                        if(list[i].count >= 2)
                        {
                            rc = list[i].count - 1;
                        }
                        else
                        {
                            rc = list[i].count;
                        }
                    }
                }
                //result.push('名称：'+allitem[j].name+'，数量：'+list[i].count+allitem[j].unit+'，单价：'+allitem[j].price.toFixed(2)+'(元)'+'，小计：'+(rc*allitem[j].price).toFixed(2)+'(元)')
                //console.log('名称：'+allitem[j].name+'，数量：'+list[i].count+allitem[j].unit+'，单价：'+allitem[j].price.toFixed(2)+'(元)'+'，小计：'+(rc*allitem[j].price).toFixed(2)+'(元)');
                //console.log('\n');
                if(flag === 1)
                    s1 += '名称：'+allitem[j].name+'，数量：'+list[i].count+allitem[j].unit+'，单价：'+allitem[j].price.toFixed(2)+'(元)'+'，小计：'+(rc*allitem[j].price).toFixed(2)+'(元)' + '\n';
                else
                    s1 +='名称：'+allitem[j].name+'，数量：'+list[i].count+allitem[j].unit+'，单价：'+allitem[j].price.toFixed(2)+'(元)'+'，小计：'+(list[i].count*allitem[j].price).toFixed(2)+'(元)' + '\n';

            }
        }
    }
    return s1;
}

function free(list)
{
    var s2='';
    for(var i=0; i<list.length; i++)
    {
        for(var j=0; j<onsaleitem[0].barcodes.length; j++)
        {
            if(list[i].name === onsaleitem[0].barcodes[j])
            {
                if(list[i].count >= 2)
                {
                    var rf = 1;
                }
                for(var k=0; k<allitem.length; k++)
                {
                    if(list[i].name === allitem[k].barcode)
                    {
                        //result.push('名称：'+allitem[k].name+'，数量：'+rf+allitem[k].unit)
                        //console.log('名称：'+allitem[k].name+'，数量：'+rf+allitem[k].unit)
                        //console.log('\n');
                        s2 += '名称：'+allitem[k].name+'，数量：'+rf+allitem[k].unit+'\n';
                    }
                }
            }
        }
    }
    return s2;
}

function total(list)
{
    var s3 ='';
    var total = 0;
    var free = 0;
    for(var i=0; i<list.length;i++)
    {
        //var rc;
        for(var j=0; j<allitem.length; j++)
        {
            if(list[i].name === allitem[j].barcode)
            {
                total += list[i].count*allitem[j].price;
                for(var k=0; k<onsaleitem[0].barcodes.length; k++)
                {
                    if(list[i].name === onsaleitem[0].barcodes[k])
                    {
                        if (list[i].count >= 2)
                        {
                            //list[i].count = list[i].count - 1;

                            free += allitem[j].price;
                            //total = total-allitem[j].price;;
                        }
                        //else rc = list[i].count;
                    }
                }
                //console.log('名称：'+allitem[j].name+'，数量：'+list[i].count+allitem[j].unit+'，单价：'+allitem[j].price.toFixed(2)+'(元)'+'，小计：'+(rc*allitem[j].price).toFixed(2)+'(元)');
                //total += rc*allitem[j].price;
            }
        }
    }
    //result.push('总计：'+(total-free).toFixed(2)+'(元)')
    //result.push('节省：'+free.toFixed(2)+'(元)')
    //console.log('总计：'+(total-free).toFixed(2)+'(元)')
    //console.log('\n')
    s3 = '总计：'+(total-free).toFixed(2)+'(元)'+'\n'+'节省：'+free.toFixed(2)+'(元)'+'\n';
    //console.log('节省：'+free.toFixed(2)+'(元)')
    //console.log('\n')
    return s3;
}


///////////////////////////////////////////////////////////////
 var inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
printInventory(inputs);
