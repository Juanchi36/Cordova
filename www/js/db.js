var myDb = null;

function initDatabase () {
	myDB = window.sqlitePlugin.openDatabase({
		name: 'db.sqlite3',
		location: 'default'
	});
}

function getMuseo () {
	myDB.transaction(function (transaction) {
		transaction.executeSql(
			'SELECT * FROM museos_museo',
			[],
			function (tx, results) {
				var len = results.rows.length,
					i;
				$('#rowCount').append(len);
				for (i = 0; i < len; i++) {
					$('#TableData').append(
						'<tr><td>' +
							results.rows.item(i).id +
							'</td><td>' +
							results.rows.item(i).nombre +
							'</td><td>' +
							results.rows.item(i).descripcion +
							'</td><td>' +
							results.rows.item(i).museo +
							'</td></tr>'
					);
				}
			},
			null
		);
	});
}

document.addEventListener('deviceready', function () {
	$('#leer').click(getMuseo);

	initDatabase();
});
