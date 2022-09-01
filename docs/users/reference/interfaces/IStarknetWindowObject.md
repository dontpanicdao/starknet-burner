[@starknet/burner](../reference.md) / [Exports](../modules.md) / IStarknetWindowObject

# Interface: IStarknetWindowObject

## Table of contents

### Properties

- [account](IStarknetWindowObject.md#account)
- [chainId](IStarknetWindowObject.md#chainid)
- [compatible](IStarknetWindowObject.md#compatible)
- [enable](IStarknetWindowObject.md#enable)
- [icon](IStarknetWindowObject.md#icon)
- [id](IStarknetWindowObject.md#id)
- [isConnected](IStarknetWindowObject.md#isconnected)
- [isPreauthorized](IStarknetWindowObject.md#ispreauthorized)
- [name](IStarknetWindowObject.md#name)
- [off](IStarknetWindowObject.md#off)
- [on](IStarknetWindowObject.md#on)
- [provider](IStarknetWindowObject.md#provider)
- [request](IStarknetWindowObject.md#request)
- [selectedAddress](IStarknetWindowObject.md#selectedaddress)
- [version](IStarknetWindowObject.md#version)

## Properties

### account

• `Optional` **account**: `AccountInterface`

#### Defined in

[lib/interface.ts:21](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L21)

___

### chainId

• `Optional` **chainId**: `StarknetChainId`

#### Defined in

[lib/interface.ts:17](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L17)

___

### compatible

• **compatible**: `string`

#### Defined in

[lib/interface.ts:18](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L18)

___

### enable

• **enable**: (`options?`: { `showModal?`: `boolean`  }) => `Promise`<`string`[]\>

#### Type declaration

▸ (`options?`): `Promise`<`string`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.showModal?` | `boolean` |

##### Returns

`Promise`<`string`[]\>

#### Defined in

[lib/interface.ts:26](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L26)

___

### icon

• **icon**: `string`

#### Defined in

[lib/interface.ts:14](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L14)

___

### id

• **id**: `string`

#### Defined in

[lib/interface.ts:11](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L11)

___

### isConnected

• **isConnected**: `boolean`

#### Defined in

[lib/interface.ts:15](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L15)

___

### isPreauthorized

• **isPreauthorized**: () => `Promise`<`boolean`\>

#### Type declaration

▸ (): `Promise`<`boolean`\>

##### Returns

`Promise`<`boolean`\>

#### Defined in

[lib/interface.ts:27](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L27)

___

### name

• **name**: `string`

#### Defined in

[lib/interface.ts:12](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L12)

___

### off

• **off**: (`event`: `EventType`, `handleEvent`: `EventHandler`) => `void`

#### Type declaration

▸ (`event`, `handleEvent`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `EventType` |
| `handleEvent` | `EventHandler` |

##### Returns

`void`

#### Defined in

[lib/interface.ts:29](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L29)

___

### on

• **on**: (`event`: `EventType`, `handleEvent`: `EventHandler`) => `void`

#### Type declaration

▸ (`event`, `handleEvent`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `EventType` |
| `handleEvent` | `EventHandler` |

##### Returns

`void`

#### Defined in

[lib/interface.ts:28](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L28)

___

### provider

• `Optional` **provider**: `ProviderInterface`

#### Defined in

[lib/interface.ts:20](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L20)

___

### request

• **request**: <T\>(`call`: `Omit`<`T`, ``"result"``\>) => `Promise`<`T`[``"result"``]\>

#### Type declaration

▸ <`T`\>(`call`): `Promise`<`T`[``"result"``]\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RpcMessage` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `call` | `Omit`<`T`, ``"result"``\> |

##### Returns

`Promise`<`T`[``"result"``]\>

#### Defined in

[lib/interface.ts:23](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L23)

___

### selectedAddress

• `Optional` **selectedAddress**: `string`

#### Defined in

[lib/interface.ts:16](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L16)

___

### version

• **version**: `string`

#### Defined in

[lib/interface.ts:13](https://github.com/dontpanicdao/starknet-burner/blob/d802c7d/burner/extension/src/lib/interface.ts#L13)
