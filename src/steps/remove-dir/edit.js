/**
 * Wordpress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { trash } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import {
	Placeholder,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews';

/**
 * Internal dependencies.
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { path } = attributes;

	return (
		<p {...useBlockProps()}>
			<Placeholder
				icon={trash}
				label="Remove Directory"
				instructions={!isSelected && `at ${path || '{path}'}`}>
				{isSelected && (
					<VStack style={{ width: '100%' }}>
						<DataForm
							data={attributes}	
							fields={[
								{
									id: 'path',
									label: 'File Path',
									type: 'text'
								}
							]}
							form={{
								fields: [
									'path'
								]
							}}
							onChange={setAttributes}
						/>
					</VStack>
				)}
			</Placeholder>
		</p>
	);
}
