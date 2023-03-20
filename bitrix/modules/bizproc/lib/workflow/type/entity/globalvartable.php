<?php

namespace Bitrix\Bizproc\Workflow\Type\Entity;

use Bitrix\Bizproc\FieldType;
use Bitrix\Main;
use Bitrix\Main\ORM\Event;

/**
 * Class GlobalVarTable
 *
 * DO NOT WRITE ANYTHING BELOW THIS
 *
 * <<< ORMENTITYANNOTATION
 * @method static EO_GlobalVar_Query query()
 * @method static EO_GlobalVar_Result getByPrimary($primary, array $parameters = [])
 * @method static EO_GlobalVar_Result getById($id)
 * @method static EO_GlobalVar_Result getList(array $parameters = [])
 * @method static EO_GlobalVar_Entity getEntity()
 * @method static \Bitrix\Bizproc\Workflow\Type\Entity\EO_GlobalVar createObject($setDefaultValues = true)
 * @method static \Bitrix\Bizproc\Workflow\Type\Entity\EO_GlobalVar_Collection createCollection()
 * @method static \Bitrix\Bizproc\Workflow\Type\Entity\EO_GlobalVar wakeUpObject($row)
 * @method static \Bitrix\Bizproc\Workflow\Type\Entity\EO_GlobalVar_Collection wakeUpCollection($rows)
 */
class GlobalVarTable extends Main\ORM\Data\DataManager
{
	public static function getTableName(): string
	{
		return 'b_bp_global_var';
	}

	public static function getMap(): array
	{
		return [
			'ID' => [
				'data_type' => 'string',
				'primary' => true,
			],
			'NAME' => [
				'data_type' => 'string',
			],
			'DESCRIPTION' => [
				'data_type' => 'string',
			],
			'PROPERTY_TYPE' => [
				'data_type' => 'string',
			],
			'IS_REQUIRED' => [
				'data_type' => 'boolean',
				'values' => ['N', 'Y']
			],
			'IS_MULTIPLE' => [
				'data_type' => 'boolean',
				'values' => ['N', 'Y']
			],
			'PROPERTY_OPTIONS' => [
				'data_type' => 'string',
				'serialized' => true,
			],
			'PROPERTY_SETTINGS' => [
				'data_type' => 'string',
				'serialized' => true,
			],
			'PROPERTY_VALUE' => [
				'data_type' => 'string',
				'serialized' => true,
			],
			'CREATED_DATE' => [
				'data_type' => 'datetime',
			],
			'CREATED_BY' => [
				'data_type' => 'integer',
			],
			'VISIBILITY' => [
				'data_type' => 'string',
			],
			'MODIFIED_DATE' => [
				'data_type' => 'datetime',
			],
			'MODIFIED_BY' => [
				'data_type' => 'integer',
			],
		];
	}

	/**
	 * @throws Main\ObjectPropertyException
	 * @throws Main\SystemException
	 * @throws \Exception
	 */
	public static function upsertByProperty(string $varId, array $property, int $userId = null)
	{
		$property = static::normalizePropertyForUpsert($property, $userId);

		// PROPERTY_SETTINGS ?
		$fields = [
			'NAME' => trim($property['Name']),
			'DESCRIPTION' => $property['Description'],
			'PROPERTY_TYPE' => $property['Type'],
			'IS_REQUIRED' => $property['Required'] ? 'Y' : 'N',
			'IS_MULTIPLE' => $property['Multiple'] ? 'Y' : 'N',
			'PROPERTY_OPTIONS' => $property['Options'],
			'PROPERTY_VALUE' => $property['Default'],
			'VISIBILITY' => $property['Visibility'],
			'CREATED_BY' => $property['CreatedBy'],
			'CREATED_DATE' => $property['CreatedDate'],
			'MODIFIED_DATE' => $property['ModifiedDate'],
			'MODIFIED_BY' => $property['ModifiedBy'],
		];

		if ($userId === null) // update by robot
		{
			unset($fields['CREATED_BY'], $fields['CREATED_DATE'], $fields['MODIFIED_BY'], $fields['MODIFIED_DATE']);
		}

		$oldProperty = static::getByPrimary($varId)->fetch();
		if ($oldProperty)
		{
			if (isset($oldProperty['CREATED_BY']))
			{
				unset($fields['CREATED_BY'], $fields['CREATED_DATE']);
			}

			$result = static::update($varId, $fields);
		}
		else
		{
			$fields['ID'] = $varId;
			$result = static::add($fields);
		}

		return $result;
	}

	public static function convertToProperty(array $fields): array
	{
		// Settings ?
		return [
			'Name' => $fields['NAME'],
			'Description' => $fields['DESCRIPTION'],
			'Type' => $fields['PROPERTY_TYPE'],
			'Required' => \CBPHelper::getBool($fields['IS_REQUIRED']),
			'Multiple' => \CBPHelper::getBool($fields['IS_MULTIPLE']),
			'Options' => $fields['PROPERTY_OPTIONS'],
			'Default' => $fields['PROPERTY_VALUE'],
			'CreatedBy' => (int)$fields['CREATED_BY'],
			'CreatedDate' => $fields['CREATED_DATE'],
			'Visibility' => $fields['VISIBILITY'],
			'ModifiedBy' => (int)$fields['MODIFIED_BY'],
			'ModifiedDate' => $fields['MODIFIED_DATE'],
		];
	}

	private static function normalizePropertyForUpsert($property, int $userId = null): array
	{
		$normalized = [];
		$normalizedAsField = FieldType::normalizeProperty($property);

		$normalized['Visibility'] = isset($property['Visibility']) ? (string)$property['Visibility'] : 'GLOBAL';
		$normalized['ModifiedBy'] = $userId;
		$normalized['CreatedBy'] = $userId;
		$normalized['ModifiedDate'] = new Main\Type\DateTime();
		$normalized['CreatedDate'] = $normalized['ModifiedDate'];

		return array_merge($normalized, $normalizedAsField);
	}

	public static function onBeforeUpdate(Event $event)
	{
		$result = new Main\ORM\EventResult();
		$result->unsetFields(['PROPERTY_TYPE', 'IS_REQUIRED', 'IS_MULTIPLE', 'VISIBILITY']);

		return $result;
	}
}