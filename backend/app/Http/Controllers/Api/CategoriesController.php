<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    // Lấy tất cả danh mục
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json([
                'success' => true,
                'data' => $categories
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi lấy danh mục: ' . $e->getMessage()
            ], 500);
        }
    }

    // Lấy chi tiết danh mục
    public function show($id)
    {
        try {
            $category = Category::with('products')->find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Danh mục không tồn tại'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $category
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    // Tạo danh mục mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        try {
            $category = Category::create($request->only(['name', 'description']));

            return response()->json([
                'success' => true,
                'message' => 'Tạo danh mục thành công',
                'data' => $category
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi tạo danh mục: ' . $e->getMessage()
            ], 500);
        }
    }

    // Cập nhật danh mục
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Danh mục không tồn tại'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        try {
            $category->update($request->only(['name', 'description']));

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật danh mục thành công',
                'data' => $category
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi cập nhật danh mục: ' . $e->getMessage()
            ], 500);
        }
    }

    // Xóa danh mục
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Danh mục không tồn tại'
            ], 404);
        }

        try {
            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa danh mục thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi xóa danh mục: ' . $e->getMessage()
            ], 500);
        }
    }
}
