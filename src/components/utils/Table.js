import React from 'react';

const EMPTY_STATE = (
	<div className="flex items-center justify-center w-full h-full">
		<p className="text-red-600">No data to display</p>
	</div>
);

export function Table({ columns, data, mappedColumnNames, onRowClick, rowKey, emptyState = EMPTY_STATE, imageKey }) {
	const resolveName = (key) => {
		return String(mappedColumnNames[key] ?? key);
	};

	return (
		<>
			<table className="min-w-full divide-y divide-gray-200 w-full">
				<thead>
					<tr>
						{imageKey && (
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-slate-200 uppercase tracking-wider"
								scope="col"
							/>
						)}
						{columns.map((column, index) => (
							<th
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-slate-200 uppercase tracking-wider"
								key={index}
								scope="col"
							>
								{resolveName(column)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.length ? (
						data.map((row, index) => (
							<tr
								className="cursor-pointer hover:bg-gray-50"
								key={rowKey && row[rowKey] ? String(row[rowKey]) : index}
								onClick={async () => onRowClick(row)}
							>
								{imageKey && (
									<td className="px-6 py-4 whitespace-nowrap">
										{row[imageKey] ? (
											<img alt="" className="w-10 h-10 rounded-full" src={String(row[imageKey])} />
										) : null}
									</td>
								)}
								{columns.map((column, columnIndex) => (
									<td className="px-6 py-4 whitespace-nowrap" key={columnIndex}>
										{String(row[column])}
									</td>
								))}
							</tr>
						))
					) : (
						<tr> </tr>
					)}
				</tbody>
			</table>
			{!data.length && emptyState}
		</>
	);
}
