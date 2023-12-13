import {
  extractBuildableFirmwareCodeParameters,
  replaceBuildableFirmwareCodeWithParameterDefaultValues,
} from './FirmwareCodeParser';
import { IBuildableFirmwareCodeParameter } from '../../store/state';

describe('FirmwareCodeParser', () => {
  describe('replaceBuildableFirmwareCodeWithParameterDefaultValues', () => {
    test('should replace with default values', () => {
      const input = `
        <remap name="foo" type="select" default="baz" options="bar,baz" />
        <remap name="bar" type="text" default="john" />
        <remap name="baz" type="number" default="20" />
      `;
      const parameters: IBuildableFirmwareCodeParameter[] =
        extractBuildableFirmwareCodeParameters(input);

      const replaced = replaceBuildableFirmwareCodeWithParameterDefaultValues(
        input,
        parameters
      );

      expect(replaced).toEqual(`
        baz
        john
        20
      `);
    });

    test('should replace with default values without the parameter which has no options', () => {
      const input = `
        <remap name="foo" type="select" default="baz" />
        <remap name="bar" type="text" default="john" />
        <remap name="baz" type="number" default="20" />
      `;
      const parameters: IBuildableFirmwareCodeParameter[] =
        extractBuildableFirmwareCodeParameters(input);

      const replaced = replaceBuildableFirmwareCodeWithParameterDefaultValues(
        input,
        parameters
      );

      expect(replaced).toEqual(`
        <remap name="foo" type="select" default="baz" />
        john
        20
      `);
    });
  });

  describe('extractBuildableFirmwareCodeParameters', () => {
    test('should extract parameters from source', () => {
      const source = `
        <remap name="foo" type="select" default="baz" options="bar,baz" />
        <remap name="bar" type="text" default="john" />
        <remap name="baz" type="number" default="20" />
      `;

      const parameters = extractBuildableFirmwareCodeParameters(source);

      expect(parameters).toEqual([
        {
          name: 'foo',
          type: 'select',
          options: ['bar', 'baz'],
          default: 'baz',
          startPosition: 9,
          endPosition: 75,
        },
        {
          name: 'bar',
          type: 'text',
          options: [],
          default: 'john',
          startPosition: 84,
          endPosition: 131,
        },
        {
          name: 'baz',
          type: 'number',
          options: [],
          default: '20',
          startPosition: 140,
          endPosition: 187,
        },
      ]);
    });

    test('should extract parameters from source without the parameter which has no options', () => {
      const source = `
        <remap name="foo" type="select" default="baz" />
        <remap name="bar" type="text" default="john" />
        <remap name="baz" type="number" default="20" />
      `;

      const parameters = extractBuildableFirmwareCodeParameters(source);

      expect(parameters).toEqual([
        {
          name: 'bar',
          type: 'text',
          options: [],
          default: 'john',
          startPosition: 66,
          endPosition: 113,
        },
        {
          name: 'baz',
          type: 'number',
          options: [],
          default: '20',
          startPosition: 122,
          endPosition: 169,
        },
      ]);
    });

    test('should extract parameters from source without the parameter which has unknown type', () => {
      const source = `
        <remap name="foo" type="select" options="bar,baz" default="baz" />
        <remap name="bar" type="unknown" default="john" />
        <remap name="baz" type="number" default="20" />
      `;

      const parameters = extractBuildableFirmwareCodeParameters(source);

      expect(parameters).toEqual([
        {
          name: 'foo',
          type: 'select',
          options: ['bar', 'baz'],
          default: 'baz',
          startPosition: 9,
          endPosition: 75,
        },
        {
          name: 'baz',
          type: 'number',
          options: [],
          default: '20',
          startPosition: 143,
          endPosition: 190,
        },
      ]);
    });

    test('should extract parameters from source with comment', () => {
      const source = `
        <remap name="foo" type="select" default="baz" options="bar,baz" comment="comment1" />
        <remap name="bar" type="text" default="john" comment="comment2" />
        <remap name="baz" type="number" default="20" comment="comment3 foobar" />
      `;

      const parameters = extractBuildableFirmwareCodeParameters(source);

      expect(parameters).toEqual([
        {
          name: 'foo',
          type: 'select',
          options: ['bar', 'baz'],
          default: 'baz',
          comment: 'comment1',
          startPosition: 9,
          endPosition: 94,
        },
        {
          name: 'bar',
          type: 'text',
          options: [],
          default: 'john',
          comment: 'comment2',
          startPosition: 103,
          endPosition: 169,
        },
        {
          name: 'baz',
          type: 'number',
          options: [],
          default: '20',
          comment: 'comment3 foobar',
          startPosition: 178,
          endPosition: 251,
        },
      ]);
    });
  });
});