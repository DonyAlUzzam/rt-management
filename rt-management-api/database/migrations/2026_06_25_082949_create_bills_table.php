<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {

            $table->id();

            $table->foreignId('house_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('resident_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('bill_type_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedTinyInteger('period_month');

            $table->year('period_year');

            $table->decimal('amount', 15, 2);

            $table->enum('status', [
                'paid',
                'unpaid'
            ])->default('unpaid');

            $table->timestamps();

            $table->unique([
                'house_id',
                'bill_type_id',
                'period_month',
                'period_year'
            ], 'bill_unique_period');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
