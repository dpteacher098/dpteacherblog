$(function () {
    Retrieve();
});

function Retrieve() {
    // 已更新為您提供的網路應用程式網址
    var URL = 'https://script.google.com/macros/s/AKfycbwG0YjUWf8OZwOuy52o5jNEQcqw5EKGzG3qhPBWX_Pcus9OlleuO0BoF5GZcWgmCkOh8Q/exec';
    
    $.ajax({
        url: URL,
        type: 'POST',
        dataType: "json",
        error: function (xhr) {
            alert(' 發生錯誤！請重新再試一次～ ');
        },
        success: function (Jdata) {
            var Info = Jdata.data;
			// 👇 加上這一行，把 GAS 傳來的第一筆資料印出來看看 👇
            //console.log("API回傳的資料結構：", Info[0]);
			var Length=Number(Info.length)
			if(Length > 0) {
				for (i = 0; Info.length > i; i++) {
					FillTime = Info[i].FillTime;
					
					classID = Info[i].classID;
					App_name = Info[i].App_name;
					Itemclass = Info[i].Itemclass;
					BorrowDate = Info[i].BorrowDate;
					StartTime = Info[i].StartTime;
					EndTime = Info[i].EndTime;
					Reason = Info[i].Reason;
					// 印出資料
					print();
				};
			}else{
					// 💡 修正：補上標準的儲存格標籤，並設定 colspan="8" 讓文字置中橫跨整個表格
                	$("#table-data").append('<tr><td colspan="8" style="text-align:center; padding: 20px; color: gray;">目前暫無未過期之公告資料</td></tr>');
		}
	    //  資料列印
            function print() {
                $("#table-data").append(
                    '<tr>' +
                    '<td class="w-15">' + FillTime + '</td>' +
                    '<td class="w-10">' + classID + '</td>' +
                    '<td class="w-10">' + App_name + '</td>' +
                    '<td class="w-10">' + Itemclass +'</td>' +
                    '<td class="w-10">' + BorrowDate + '</td>' +
                    '<td class="w-10">' + StartTime + '</td>' +
                    '<td class="w-10">' + EndTime + '</td>' +
                    '<td class="w-20">' + Reason + '</td>' +
                    '</tr>'
                );
            };
	    // 場地搜尋            
            $("#doaction").click(function () {
                select();
            });

            function select() {
                var result = "";
                $("#select").each(function () {
                    result = $(this).val();
                    search_table($(this).val());
                });
            };

		function search_table(value) {
			// 1. 先移除舊的「暫無資料」提示列（避免重複顯示）
			$("#no-data-row").remove();
		
			var visibleCount = 0; // 用來計算目前顯示的列數
		
			$('tbody tr').each(function () {
				var found = 'false';
				$(this).each(function () {
					if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
						found = 'true';
					}
				});
		
				if (found == 'true') {
					$(this).show();
					visibleCount++; // 如果這列符合搜尋條件，計數加 1
				} else {
					$(this).hide();
				}
			});
		
			// 2. 如果計數為 0，表示沒有符合搜尋條件的資料
			if (visibleCount === 0) {
				// 在 tbody 中新增一行提示文字，colspan 設為 8 是因為你的表格原本有 8 欄
				$('tbody').append(
					'<tr id="no-data-row">' +
					'<td colspan="8" style="text-align:center; padding: 20px; color: gray;">暫無資料</td>' +
					'</tr>'
				);
			}
		}
	    
		}
    });
};